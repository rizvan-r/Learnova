from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Optional
from backend.app.models.schemas import SchoolBase, ProfileBase
from backend.app.services.store import db

router = APIRouter(prefix="/schools", tags=["Schools"])


@router.get("", response_model=List[SchoolBase])
async def list_schools(
    district: Optional[str] = Query(None, description="Filter by district"),
    search: Optional[str] = Query(None, description="Search by school name or code")
):
    schools = list(db.schools.values())
    if district:
        schools = [s for s in schools if s["district"].lower() == district.lower()]
    if search:
        q = search.lower()
        schools = [
            s for s in schools
            if q in s["name"].lower() or q in s["emis_code"].lower() or (s.get("name_ta") and q in s["name_ta"])
        ]
    return [SchoolBase(**s) for s in schools]


@router.get("/{school_id}", response_model=SchoolBase)
async def get_school(school_id: str):
    school = db.schools.get(school_id)
    if not school:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="School not found")
    return SchoolBase(**school)


@router.get("/{school_id}/staff", response_model=List[ProfileBase])
async def get_school_staff(school_id: str):
    """Retrieve teachers, staff, and headmaster directory for a school."""
    staff_members = [
        p for p in db.profiles.values()
        if p.get("school_id") == school_id and p["role"] in ("staff", "headmaster")
    ]
    return [ProfileBase(**p) for p in staff_members]
