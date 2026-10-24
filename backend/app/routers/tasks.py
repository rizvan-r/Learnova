import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from pydantic import BaseModel
from backend.app.models.schemas import StaffTask, TaskSubmit, TaskReview, ProfileBase, UserRole
from backend.app.core.security import get_current_user, require_roles
from backend.app.services.store import db

router = APIRouter(prefix="/tasks", tags=["Staff Tasks & Evidence"])


class TaskCreate(BaseModel):
    assigned_to: str
    title: str
    title_ta: str
    description: str
    due_date: str  # YYYY-MM-DD
    task_type: str = "digital_teaching"


@router.get("", response_model=List[StaffTask])
async def list_tasks(current_user: ProfileBase = Depends(get_current_user)):
    """Staff sees their own tasks; Headmaster sees all school tasks."""
    if current_user.role == UserRole.STAFF:
        items = [t for t in db.staff_tasks if t["assigned_to"] == current_user.id]
    elif current_user.role in (UserRole.HEADMASTER, UserRole.EDUCATION_OFFICER):
        items = db.staff_tasks
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    return [StaffTask(**t) for t in items]


@router.post("", response_model=StaffTask)
async def create_task(
    body: TaskCreate,
    current_user: ProfileBase = Depends(require_roles([UserRole.HEADMASTER]))
):
    """Headmaster assigns a task or fortnightly digital evidence requirement."""
    new_task = {
        "id": f"task-{uuid.uuid4().hex[:6]}",
        "school_id": current_user.school_id,
        "assigned_to": body.assigned_to,
        "title": body.title,
        "title_ta": body.title_ta,
        "description": body.description,
        "due_date": datetime.strptime(body.due_date, "%Y-%m-%d").date(),
        "task_type": body.task_type,
        "status": "pending",
        "evidence_url": None,
        "evidence_notes": None,
        "reviewed_by": None,
        "review_feedback": None,
        "credits_awarded": 0,
        "created_at": datetime.now(timezone.utc),
    }
    db.staff_tasks.insert(0, new_task)
    return StaffTask(**new_task)


@router.post("/{task_id}/submit", response_model=StaffTask)
async def submit_task_evidence(
    task_id: str,
    body: TaskSubmit,
    current_user: ProfileBase = Depends(require_roles([UserRole.STAFF]))
):
    """Staff submits digital teaching evidence link and execution notes."""
    for t in db.staff_tasks:
        if t["id"] == task_id:
            if t["assigned_to"] != current_user.id:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not assigned to you")
            t["status"] = "submitted"
            t["evidence_url"] = body.evidence_url
            t["evidence_notes"] = body.evidence_notes

            db.log_audit(
                user_id=current_user.id,
                action="TEACHING_EVIDENCE_SUBMITTED",
                entity_type="task",
                entity_id=task_id,
                details={"evidence_url": body.evidence_url}
            )
            return StaffTask(**t)

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")


@router.post("/{task_id}/review", response_model=StaffTask)
async def review_task_evidence(
    task_id: str,
    body: TaskReview,
    current_user: ProfileBase = Depends(require_roles([UserRole.HEADMASTER]))
):
    """Headmaster reviews evidence and awards performance assessment credits."""
    for t in db.staff_tasks:
        if t["id"] == task_id:
            t["status"] = body.status
            t["reviewed_by"] = current_user.id
            t["review_feedback"] = body.review_feedback
            t["credits_awarded"] = body.credits_awarded if body.status == "approved" else 0

            db.log_audit(
                user_id=current_user.id,
                action="TASK_EVIDENCE_REVIEWED",
                entity_type="task",
                entity_id=task_id,
                details={"status": body.status, "credits": t["credits_awarded"]}
            )
            return StaffTask(**t)

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
