from fastapi import APIRouter, Depends, HTTPException, status
from backend.app.models.schemas import StudentPortfolio, ProfileBase, SchoolBase, UserRole
from backend.app.core.security import get_current_user
from backend.app.services.store import db

router = APIRouter(prefix="/students", tags=["Students"])


@router.get("/me/portfolio", response_model=StudentPortfolio)
async def get_my_portfolio(current_user: ProfileBase = Depends(get_current_user)):
    """Retrieve personal academic portfolio for currently logged-in student."""
    if current_user.role != UserRole.STUDENT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Portfolio endpoint is exclusively for student role"
        )

    student_rec = db.student_records.get(current_user.id)
    if not student_rec:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student portfolio record not found"
        )

    school_data = db.schools.get(student_rec["school_id"])
    if not school_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assigned school not found"
        )

    return StudentPortfolio(
        profile=current_user,
        school=SchoolBase(**school_data),
        grade=student_rec["grade"],
        section=student_rec["section"],
        roll_number=student_rec["roll_number"],
        attendance_percentage=student_rec["attendance_percentage"],
        academic_year=student_rec["academic_year"],
        gpa=student_rec["gpa"],
        achievements=student_rec.get("achievements", [])
    )
