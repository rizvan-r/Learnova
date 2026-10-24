from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from backend.app.models.schemas import PerformanceReview, ProfileBase, UserRole
from backend.app.core.security import get_current_user
from backend.app.services.store import db

router = APIRouter(prefix="/performance", tags=["Performance Credits & Reviews"])


@router.get("/me")
async def get_my_performance(current_user: ProfileBase = Depends(get_current_user)) -> Dict[str, Any]:
    """Retrieve performance credits breakdown across the two 6-month review periods."""
    reviews = [r for r in db.performance_reviews if r["profile_id"] == current_user.id]

    first_half = next((r for r in reviews if r["review_period"] == "first_6_months"), None)
    second_half = next((r for r in reviews if r["review_period"] == "next_6_months"), None)

    return {
        "user_id": current_user.id,
        "role": current_user.role,
        "academic_year": "2026-2027",
        "total_credits": first_half["total_credits"] if first_half else 85,
        "periods": {
            "first_6_months": {
                "label": "Term 1 (Collaborations, Tasks, Digital Pedagogy)",
                "status": "completed" if first_half else "in_progress",
                "credits": first_half["total_credits"] if first_half else 88,
                "criteria": first_half["criteria_scores"] if first_half else {
                    "digital_teaching": 28,
                    "student_activity": 22,
                    "innovative_pedagogy": 20,
                    "timely_evaluations": 18
                },
                "feedback": first_half["feedback"] if first_half else "Consistent achievement of learning milestone standards."
            },
            "next_6_months": {
                "label": "Term 2 (Exam Outcomes, Remediations, verified results)",
                "status": "upcoming",
                "credits": 0,
                "criteria": {
                    "exam_readiness": 0,
                    "remedial_sessions": 0,
                    "verified_outcomes": 0
                },
                "feedback": "Scheduled for evaluation at end of academic year."
            }
        }
    }


@router.get("/reviews", response_model=List[PerformanceReview])
async def list_performance_reviews(current_user: ProfileBase = Depends(get_current_user)):
    """List staff performance reviews for Headmaster / Officer review."""
    return [PerformanceReview(**r) for r in db.performance_reviews]
