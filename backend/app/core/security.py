import jwt
from fastapi import HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List
from backend.app.config import settings
from backend.app.models.schemas import UserRole, ProfileBase
from backend.app.services.store import db

security = HTTPBearer(auto_error=False)


def create_demo_token(user_id: str, role: str) -> str:
    """Create a signed JWT token or format for local demo testing."""
    payload = {
        "sub": user_id,
        "role": role,
        "iss": "learnova-demo-auth",
    }
    return jwt.encode(payload, settings.SUPABASE_JWT_SECRET, algorithm="HS256")


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Security(security)
) -> ProfileBase:
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials

    # 1. Check for quick development demo tokens
    if settings.DEMO_AUTH_ENABLED:
        if token.startswith("demo-token-"):
            role_str = token.replace("demo-token-", "")
            try:
                role = UserRole(role_str)
                profile = db.get_profile_by_role(role)
                if profile:
                    return ProfileBase(**profile)
            except ValueError:
                pass

    # 2. Try decoding JWT
    try:
        # Decode without signature verification if secret is demo, or verify with secret
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            options={"verify_signature": False} if settings.ENVIRONMENT == "development" else {"verify_signature": True}
        )
        user_id = payload.get("sub")
        if user_id and user_id in db.profiles:
            return ProfileBase(**db.profiles[user_id])
        
        # If user not found by sub, try looking up by email in payload
        email = payload.get("email")
        if email:
            for p in db.profiles.values():
                if p["email"] == email:
                    return ProfileBase(**p)
                    
    except Exception as e:
        pass

    # Fallback to student for smooth demo development if token present and demo enabled
    if settings.DEMO_AUTH_ENABLED and token:
        # Check if token matches a profile ID directly
        if token in db.profiles:
            return ProfileBase(**db.profiles[token])

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired access token",
        headers={"WWW-Authenticate": "Bearer"},
    )


async def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Security(security)
) -> Optional[ProfileBase]:
    if not credentials:
        return None
    try:
        return await get_current_user(credentials)
    except HTTPException:
        return None


def require_roles(allowed_roles: List[UserRole]):
    async def role_checker(current_user: ProfileBase = Security(get_current_user)) -> ProfileBase:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation restricted. Requires one of roles: {[r.value for r in allowed_roles]}",
            )
        return current_user
    return role_checker
