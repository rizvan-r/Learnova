from fastapi import APIRouter, HTTPException, Depends, status
from backend.app.models.schemas import (
    DemoLoginRequest,
    EmisLoginRequest,
    AuthTokenResponse,
    ProfileBase,
    UserRole,
)
from backend.app.services.store import db
from backend.app.core.security import get_current_user, create_demo_token
from backend.app.config import settings

router = APIRouter(tags=["Authentication"])


@router.post("/auth/demo-login", response_model=AuthTokenResponse)
async def demo_login(req: DemoLoginRequest):
    """Switch instantly between the 5 demo roles during development."""
    if not settings.DEMO_AUTH_ENABLED:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Demo authentication is disabled in production."
        )

    profile_dict = db.get_profile_by_role(req.role)
    if not profile_dict:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No seed profile found for role {req.role.value}"
        )

    profile = ProfileBase(**profile_dict)
    token = create_demo_token(profile.id, profile.role.value)
    
    db.log_audit(
        user_id=profile.id,
        action="DEMO_LOGIN",
        entity_type="session",
        entity_id=profile.id,
        details={"role": req.role.value}
    )

    return AuthTokenResponse(access_token=token, user=profile)


@router.post("/auth/emis-login", response_model=AuthTokenResponse)
async def emis_login(req: EmisLoginRequest):
    """Student EMIS Login prototype with EMIS code and DOB."""
    profile_dict = db.get_profile_by_emis(req.emis_number)
    if not profile_dict:
        # Fallback to demo student if EMIS begins with 33
        if req.emis_number.startswith("33"):
            profile_dict = db.get_profile_by_role(UserRole.STUDENT)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid EMIS Number or credentials"
            )

    profile = ProfileBase(**profile_dict)
    token = create_demo_token(profile.id, profile.role.value)

    db.log_audit(
        user_id=profile.id,
        action="EMIS_LOGIN",
        entity_type="session",
        entity_id=profile.id,
        details={"emis": req.emis_number}
    )

    return AuthTokenResponse(access_token=token, user=profile)


@router.get("/me", response_model=ProfileBase)
async def get_me(current_user: ProfileBase = Depends(get_current_user)):
    """Retrieve currently authenticated user profile."""
    return current_user
