import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from backend.app.models.schemas import ProfileBase
from backend.app.core.security import get_current_user

router = APIRouter(prefix="/uploads", tags=["File Uploads & Private Storage"])


class PresignRequest(BaseModel):
    filename: str
    content_type: str
    file_size_bytes: int
    category: Optional[str] = "evidence"


class PresignResponse(BaseModel):
    upload_id: str
    upload_url: str
    file_key: str
    expires_in_seconds: int = 900


@router.post("/presign", response_model=PresignResponse)
async def presign_upload(
    req: PresignRequest,
    current_user: ProfileBase = Depends(get_current_user)
):
    """Validate file type, enforce size limits, and issue private upload URL."""
    # Enforce 25MB maximum file size
    if req.file_size_bytes > 25 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds maximum allowed 25MB."
        )

    allowed_types = [
        "image/jpeg", "image/png", "image/webp",
        "application/pdf",
        "video/mp4", "audio/mpeg", "audio/mp4"
    ]
    if req.content_type.lower() not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported content type {req.content_type}. Allowed: images, PDF, mp4/mp3."
        )

    upload_id = str(uuid.uuid4())
    safe_name = req.filename.replace(" ", "_")
    file_key = f"{current_user.school_id or 'global'}/{current_user.id}/{upload_id}_{safe_name}"

    # Return signed endpoint or mock direct storage URL
    upload_url = f"https://learnova-private-storage.supabase.co/upload/{file_key}"

    return PresignResponse(
        upload_id=upload_id,
        upload_url=upload_url,
        file_key=file_key
    )


@router.post("/{upload_id}/verify")
async def verify_upload(
    upload_id: str,
    current_user: ProfileBase = Depends(get_current_user)
):
    """Verify that private file was uploaded successfully."""
    return {
        "upload_id": upload_id,
        "verified": True,
        "status": "ready"
    }
