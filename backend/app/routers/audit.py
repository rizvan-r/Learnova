from fastapi import APIRouter, Depends
from typing import List
from backend.app.models.schemas import AuditLogEntry, ProfileBase, UserRole
from backend.app.core.security import require_roles
from backend.app.services.store import db

router = APIRouter(prefix="/audit-logs", tags=["Audit Logs"])


@router.get("", response_model=List[AuditLogEntry])
async def list_audit_logs(
    current_user: ProfileBase = Depends(require_roles([UserRole.EDUCATION_OFFICER, UserRole.HEADMASTER]))
):
    """Retrieve immutable governance audit log trail."""
    return [AuditLogEntry(**log) for log in db.audit_logs]
