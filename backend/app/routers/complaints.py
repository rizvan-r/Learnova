import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import List, Optional
from pydantic import BaseModel
from backend.app.models.schemas import (
    ComplaintCreate,
    ComplaintResponse,
    ComplaintVoteResponse,
    ProfileBase,
    UserRole
)
from backend.app.core.security import get_current_user, get_optional_user, require_roles
from backend.app.services.store import db

router = APIRouter(prefix="/complaints", tags=["Complaints & Grievances"])


class ComplaintStatusUpdate(BaseModel):
    status: str
    escalation_reason: Optional[str] = None


class ComplaintAssign(BaseModel):
    assigned_to: str


@router.get("", response_model=List[ComplaintResponse])
async def list_complaints(
    school_id: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    status_filter: Optional[str] = Query(None, alias="status"),
    current_user: Optional[ProfileBase] = Depends(get_optional_user)
):
    """Retrieve grievances. Complainant identity is never revealed if anonymous or viewed by HM."""
    items = db.complaints

    if school_id:
        items = [c for c in items if c["school_id"] == school_id]
    if category:
        items = [c for c in items if c["category"] == category]
    if status_filter:
        items = [c for c in items if c["status"] == status_filter]

    results = []
    current_user_id = current_user.id if current_user else None

    for c in items:
        votes_set = db.complaint_votes.get(c["id"], set())
        has_voted = bool(current_user_id and current_user_id in votes_set)

        results.append(
            ComplaintResponse(
                id=c["id"],
                reference_number=c["reference_number"],
                school_id=c["school_id"],
                title=c["title"],
                title_ta=c.get("title_ta"),
                category=c["category"],
                description=c["description"],
                priority=c["priority"],
                status=c["status"],
                is_anonymous=c["is_anonymous"],
                is_common_issue=c.get("is_common_issue", False),
                is_escalated_to_officer=c.get("is_escalated_to_officer", False),
                escalation_reason=c.get("escalation_reason"),
                assigned_to=c.get("assigned_to"),
                vote_count=len(votes_set),
                has_voted=has_voted,
                created_at=c["created_at"],
            )
        )

    return results


@router.post("", response_model=ComplaintResponse)
async def create_complaint(
    req: ComplaintCreate,
    current_user: ProfileBase = Depends(get_current_user)
):
    """Submit a complaint or facility issue. Identity is protected if marked anonymous."""
    ref_num = f"LN-2026-{uuid.uuid4().hex[:5].upper()}"
    new_cmp = {
        "id": f"cmp-{uuid.uuid4().hex[:6]}",
        "reference_number": ref_num,
        "school_id": current_user.school_id or "a1111111-1111-1111-1111-111111111111",
        "title": req.title,
        "title_ta": req.title,
        "category": req.category,
        "description": req.description,
        "priority": req.priority,
        "status": "submitted",
        "is_anonymous": req.is_anonymous,
        "is_common_issue": req.is_common_issue,
        "is_escalated_to_officer": False,
        "escalation_reason": None,
        "assigned_to": None,
        "created_at": datetime.now(timezone.utc),
    }

    # Store private identity separately
    db.complaint_private_data[new_cmp["id"]] = {
        "complainant_id": current_user.id,
        "complainant_role": current_user.role,
        "contact_phone": current_user.phone,
    }

    db.complaints.insert(0, new_cmp)
    db.complaint_votes[new_cmp["id"]] = set()

    db.log_audit(
        user_id=None if req.is_anonymous else current_user.id,
        action="COMPLAINT_SUBMITTED",
        entity_type="complaint",
        entity_id=new_cmp["id"],
        details={"category": req.category, "is_anonymous": req.is_anonymous}
    )

    return ComplaintResponse(
        **new_cmp,
        vote_count=0,
        has_voted=False
    )


@router.post("/{complaint_id}/votes", response_model=ComplaintVoteResponse)
async def vote_on_complaint(
    complaint_id: str,
    current_user: ProfileBase = Depends(require_roles([UserRole.STUDENT]))
):
    """Enforce strictly ONE vote per eligible student per facility issue."""
    # Verify complaint exists
    found = any(c["id"] == complaint_id for c in db.complaints)
    if not found:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Complaint not found")

    if complaint_id not in db.complaint_votes:
        db.complaint_votes[complaint_id] = set()

    votes_set = db.complaint_votes[complaint_id]
    if current_user.id in votes_set:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You have already cast your vote for this issue."
        )

    votes_set.add(current_user.id)

    db.log_audit(
        user_id=current_user.id,
        action="STUDENT_VOTED_ON_ISSUE",
        entity_type="complaint",
        entity_id=complaint_id,
        details={"total_votes": len(votes_set)}
    )

    return ComplaintVoteResponse(
        complaint_id=complaint_id,
        vote_count=len(votes_set),
        message="Vote recorded successfully"
    )


@router.patch("/{complaint_id}/status", response_model=ComplaintResponse)
async def update_complaint_status(
    complaint_id: str,
    body: ComplaintStatusUpdate,
    current_user: ProfileBase = Depends(require_roles([UserRole.HEADMASTER, UserRole.EDUCATION_OFFICER, UserRole.STAFF]))
):
    """Update status or escalate complaint to district education officer."""
    for c in db.complaints:
        if c["id"] == complaint_id:
            c["status"] = body.status
            if body.status == "escalated":
                c["is_escalated_to_officer"] = True
                c["escalation_reason"] = body.escalation_reason or "Escalated for administrative review"

            db.log_audit(
                user_id=current_user.id,
                action=f"COMPLAINT_STATUS_{body.status.upper()}",
                entity_type="complaint",
                entity_id=complaint_id,
                details={"new_status": body.status}
            )

            votes_set = db.complaint_votes.get(c["id"], set())
            return ComplaintResponse(
                **c,
                vote_count=len(votes_set),
                has_voted=current_user.id in votes_set
            )

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Complaint not found")


@router.post("/{complaint_id}/assign", response_model=ComplaintResponse)
async def assign_complaint(
    complaint_id: str,
    body: ComplaintAssign,
    current_user: ProfileBase = Depends(require_roles([UserRole.HEADMASTER, UserRole.EDUCATION_OFFICER]))
):
    """Assign grievance investigation or resolution to a staff member or technician."""
    for c in db.complaints:
        if c["id"] == complaint_id:
            c["assigned_to"] = body.assigned_to
            c["status"] = "in_review"

            db.log_audit(
                user_id=current_user.id,
                action="COMPLAINT_ASSIGNED",
                entity_type="complaint",
                entity_id=complaint_id,
                details={"assigned_to": body.assigned_to}
            )

            votes_set = db.complaint_votes.get(c["id"], set())
            return ComplaintResponse(
                **c,
                vote_count=len(votes_set),
                has_voted=current_user.id in votes_set
            )

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Complaint not found")
