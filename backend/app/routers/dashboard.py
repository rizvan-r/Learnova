from fastapi import APIRouter, Depends
from typing import Dict, Any
from backend.app.models.schemas import ProfileBase, UserRole
from backend.app.core.security import get_current_user
from backend.app.services.store import db

router = APIRouter(tags=["Dashboard"])


@router.get("/dashboard")
async def get_dashboard(current_user: ProfileBase = Depends(get_current_user)) -> Dict[str, Any]:
    """Retrieve personalized, role-specific metrics, counts, and quick highlights."""
    role = current_user.role

    if role == UserRole.STUDENT:
        student_rec = db.student_records.get(current_user.id, {})
        my_votes = [
            cid for cid, vset in db.complaint_votes.items()
            if current_user.id in vset
        ]
        return {
            "role": "student",
            "student_record": student_rec,
            "total_announcements": len(db.announcements),
            "total_career_paths": len(db.career_domains),
            "voted_issues_count": len(my_votes),
            "open_complaints_count": len([c for c in db.complaints if c["status"] != "resolved"]),
            "recent_announcements": db.announcements[:3],
        }

    elif role == UserRole.STAFF:
        my_tasks = [t for t in db.staff_tasks if t["assigned_to"] == current_user.id]
        pending_tasks = [t for t in my_tasks if t["status"] == "pending"]
        completed_tasks = [t for t in my_tasks if t["status"] in ("submitted", "approved")]
        teaching_evidence_due = any(t["task_type"] == "digital_teaching" and t["status"] == "pending" for t in my_tasks)

        return {
            "role": "staff",
            "total_tasks": len(my_tasks),
            "pending_tasks": len(pending_tasks),
            "completed_tasks": len(completed_tasks),
            "performance_credits": 92,
            "teaching_evidence_due": teaching_evidence_due,
            "tasks": my_tasks,
            "recent_announcements": db.announcements[:3],
        }

    elif role == UserRole.HEADMASTER:
        total_sanctioned = sum(a["sanctioned_amount"] for a in db.fund_allocations)
        total_remaining = sum(a["remaining_balance"] for a in db.fund_allocations)
        total_spent = sum(t["amount"] for t in db.fund_transactions if t["transaction_type"] == "expenditure")
        pending_requests = [r for r in db.fund_requests if r["status"] == "pending"]
        pending_tasks = [t for t in db.staff_tasks if t["status"] == "submitted"]
        active_collabs = [c for c in db.collaborations if c["status"] == "active"]

        return {
            "role": "headmaster",
            "school_id": current_user.school_id,
            "financial_summary": {
                "total_sanctioned": total_sanctioned,
                "total_spent": total_spent,
                "total_remaining": total_remaining,
            },
            "pending_fund_requests_count": len(pending_requests),
            "pending_staff_reviews_count": len(pending_tasks),
            "active_collaborations_count": len(active_collabs),
            "anonymous_complaints_count": len([c for c in db.complaints if c["is_anonymous"]]),
            "collaborations": db.collaborations,
            "fund_allocations": db.fund_allocations,
        }

    elif role == UserRole.DOCTOR:
        my_visits = [v for v in db.doctor_visits if v["doctor_id"] == current_user.id]
        completed_visits = [v for v in my_visits if v["status"] == "completed"]
        scheduled_visits = [v for v in my_visits if v["status"] == "scheduled"]
        total_screened = sum(v["total_screened"] for v in completed_visits)
        follow_ups = [r for r in db.health_records if r.get("follow_up_needed")]

        return {
            "role": "doctor",
            "total_visits": len(my_visits),
            "completed_visits": len(completed_visits),
            "scheduled_visits": len(scheduled_visits),
            "total_screened_students": total_screened,
            "flagged_follow_ups": len(follow_ups),
            "upcoming_visits": scheduled_visits,
            "health_records": db.health_records,
        }

    elif role == UserRole.EDUCATION_OFFICER:
        pending_fund_requests = [r for r in db.fund_requests if r["status"] == "pending"]
        escalated_complaints = [c for c in db.complaints if c.get("is_escalated_to_officer")]
        completed_inspections = [i for i in db.inspections if i["status"] == "completed"]
        scheduled_inspections = [i for i in db.inspections if i["status"] == "scheduled"]

        return {
            "role": "education_officer",
            "region": current_user.region,
            "total_schools": len(db.schools),
            "pending_fund_approvals": len(pending_fund_requests),
            "escalated_complaints_count": len(escalated_complaints),
            "completed_inspections": len(completed_inspections),
            "scheduled_inspections": len(scheduled_inspections),
            "inspections": db.inspections,
            "escalated_complaints": escalated_complaints,
        }

    return {"role": role.value}
