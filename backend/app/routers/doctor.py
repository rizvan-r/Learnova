import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from pydantic import BaseModel
from backend.app.models.schemas import (
    DoctorVisit,
    HealthRecord,
    HealthRecordCreate,
    MockSmsRequest,
    ProfileBase,
    UserRole
)
from backend.app.core.security import require_roles
from backend.app.services.store import db

router = APIRouter(prefix="/doctor", tags=["School Health & Medical Visits"])


class VisitComplete(BaseModel):
    total_screened: int
    notes: str


@router.get("/visits", response_model=List[DoctorVisit])
async def list_doctor_visits(
    current_user: ProfileBase = Depends(require_roles([UserRole.DOCTOR, UserRole.HEADMASTER, UserRole.EDUCATION_OFFICER]))
):
    """Retrieve visit calendar and history for assigned schools."""
    return [DoctorVisit(**v) for v in db.doctor_visits]


@router.post("/visits/{visit_id}/complete", response_model=DoctorVisit)
async def complete_visit(
    visit_id: str,
    body: VisitComplete,
    current_user: ProfileBase = Depends(require_roles([UserRole.DOCTOR]))
):
    """Doctor records completion of an on-site screening session."""
    for v in db.doctor_visits:
        if v["id"] == visit_id:
            v["status"] = "completed"
            v["completed_date"] = datetime.now(timezone.utc).date()
            v["total_screened"] = body.total_screened
            v["notes"] = body.notes

            db.log_audit(
                user_id=current_user.id,
                action="DOCTOR_VISIT_COMPLETED",
                entity_type="doctor_visit",
                entity_id=visit_id,
                details={"total_screened": body.total_screened}
            )
            return DoctorVisit(**v)

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Visit not found")


@router.get("/health-records", response_model=List[HealthRecord])
async def list_health_records(
    current_user: ProfileBase = Depends(require_roles([UserRole.DOCTOR]))
):
    """Doctor accesses fictional screening records for their assigned schools."""
    return [HealthRecord(**r) for r in db.health_records]


@router.post("/health-records", response_model=HealthRecord)
async def create_health_record(
    body: HealthRecordCreate,
    current_user: ProfileBase = Depends(require_roles([UserRole.DOCTOR]))
):
    """Record student health parameters and flags for follow-up."""
    # Find school from visit
    school_id = "a1111111-1111-1111-1111-111111111111"
    for v in db.doctor_visits:
        if v["id"] == body.visit_id:
            school_id = v["school_id"]
            break

    new_record = {
        "id": f"hr-{uuid.uuid4().hex[:6]}",
        "visit_id": body.visit_id,
        "school_id": school_id,
        "student_id": body.student_id,
        "student_name": body.student_name,
        "grade": body.grade,
        "height_cm": body.height_cm,
        "weight_kg": body.weight_kg,
        "vision_status": body.vision_status,
        "dental_status": body.dental_status,
        "general_health": body.general_health,
        "follow_up_needed": body.follow_up_needed,
        "follow_up_reason": body.follow_up_reason,
        "mock_sms_phone": body.mock_sms_phone or "+91 98765 00000",
        "mock_sms_sent": False,
        "mock_sms_status": "pending",
        "created_at": datetime.now(timezone.utc),
    }
    db.health_records.insert(0, new_record)

    db.log_audit(
        user_id=current_user.id,
        action="HEALTH_RECORD_CREATED",
        entity_type="health_record",
        entity_id=new_record["id"],
        details={"student": body.student_name, "follow_up": body.follow_up_needed}
    )

    return HealthRecord(**new_record)


@router.post("/notifications/mock-send")
async def send_mock_parent_sms(
    req: MockSmsRequest,
    current_user: ProfileBase = Depends(require_roles([UserRole.DOCTOR]))
):
    """Simulate dispatch of a health screening summary SMS to parent. Fictional, no real carrier calls."""
    for r in db.health_records:
        if r["id"] == req.record_id:
            r["mock_sms_sent"] = True
            r["mock_sms_status"] = "delivered_simulated"

            db.log_audit(
                user_id=current_user.id,
                action="MOCK_PARENT_SMS_DISPATCHED",
                entity_type="health_record",
                entity_id=req.record_id,
                details={"phone": r["mock_sms_phone"], "status": "delivered_simulated"}
            )

            return {
                "success": True,
                "status": "delivered_simulated",
                "phone": r["mock_sms_phone"],
                "message": req.message or f"Learnova Health Update: Screening completed for {r['student_name']}. Status: {r['general_health']}."
            }

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Health record not found")
