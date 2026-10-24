from fastapi import APIRouter, Query
from typing import List, Optional
from backend.app.models.schemas import AnnouncementBase
from backend.app.services.store import db

router = APIRouter(prefix="/announcements", tags=["Announcements"])


@router.get("", response_model=List[AnnouncementBase])
async def list_announcements(
    category: Optional[str] = Query(None, description="Filter by category (infrastructure, academic, health, etc.)")
):
    items = db.announcements
    if category:
        items = [a for a in items if a["category"].lower() == category.lower()]
    return [AnnouncementBase(**a) for a in items]
