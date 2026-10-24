import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from pydantic import BaseModel
from backend.app.models.schemas import SchoolInspection, InspectionComplete, ProfileBase, UserRole
from backend.app.core.security import require_roles
from backend.app.services.store import db

router = APIRouter(prefix="/inspections", tags=["School Inspections"])


class InspectionSchedule(BaseModel):
    school_id: str
    scheduled_date: str  # YYYY-MM-DD
    notes: str


@router.get("", response_model=List[SchoolInspection])
async def list_inspections(
    current_user: ProfileBase = Depends(require_roles([UserRole.EDUCATION_OFFICER, UserRole.HEADMASTER]))
):
    """List scheduled and completed school inspections with audit scoring."""
    return [SchoolInspection(**i) for i in db.inspections]


@router.post("", response_model=SchoolInspection)
async def schedule_inspection(
    body: InspectionSchedule,
    current_user: ProfileBase = Depends(require_roles([UserRole.EDUCATION_OFFICER]))
):
    """Education Officer schedules a formal school inspection."""
    new_insp = {
        "id": f"insp-{uuid.uuid4().hex[:6]}",
        "school_id": body.school_id,
        "officer_id": current_user.id,
        "scheduled_date": datetime.strptime(body.scheduled_date, "%Y-%m-%d").date(),
        "completed_date": None,
        "status": "scheduled",
        "academic_score": None,
        "infrastructure_score": None,
        "hygiene_score": None,
        "report_summary": body.notes,
        "photo_evidence": [],
        "latitude": None,
        "longitude": None,
        "created_at": datetime.now(timezone.utc),
    }
    db.inspections.append(new_insp)
    return SchoolInspection(**new_insp)


@router.post("/{inspection_id}/complete", response_model=SchoolInspection)
async def complete_inspection(
    inspection_id: str,
    body: InspectionComplete,
    current_user: ProfileBase = Depends(require_roles([UserRole.EDUCATION_OFFICER]))
):
    """Record scores, narrative evaluation, geotagged coordinates, and photo evidence."""
    for i in db.inspections:
        if i["id"] == inspection_id:
            i["status"] = "completed"
            i["completed_date"] = datetime.now(timezone.utc).date()
            i["academic_score"] = body.academic_score
            i["infrastructure_score"] = body.infrastructure_score
            i["hygiene_score"] = body.hygiene_score
            i["report_summary"] = body.report_summary
            i["photo_evidence"] = body.photo_evidence
            i["latitude"] = body.latitude
            i["longitude"] = body.longitude

            db.log_audit(
                user_id=current_user.id,
                action="INSPECTION_COMPLETED",
                entity_type="inspection",
                entity_id=inspection_id,
                details={
                    "academic": body.academic_score,
                    "infrastructure": body.infrastructure_score,
                    "hygiene": body.hygiene_score
                }
            )
            return SchoolInspection(**i)

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inspection not found")
