from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from backend.app.config import settings
from backend.app.routers import (
    auth,
    dashboard,
    schools,
    students,
    announcements,
    funds,
    complaints,
    courses,
    tasks,
    doctor,
    inspections,
    performance,
    uploads,
    audit,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("learnova")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Learnova — Bilingual Education Governance Platform API",
    docs_url=f"{settings.API_V1_STR}/docs",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.ENVIRONMENT == "development" else settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health endpoints
@app.get("/health", tags=["Health"])
@app.get(f"{settings.API_V1_STR}/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "demo_auth_enabled": settings.DEMO_AUTH_ENABLED,
    }

# Register all v1 routers
prefix = settings.API_V1_STR
app.include_router(auth.router, prefix=prefix)
app.include_router(dashboard.router, prefix=prefix)
app.include_router(schools.router, prefix=prefix)
app.include_router(students.router, prefix=prefix)
app.include_router(announcements.router, prefix=prefix)
app.include_router(funds.router, prefix=prefix)
app.include_router(complaints.router, prefix=prefix)
app.include_router(courses.router, prefix=prefix)
app.include_router(tasks.router, prefix=prefix)
app.include_router(doctor.router, prefix=prefix)
app.include_router(inspections.router, prefix=prefix)
app.include_router(performance.router, prefix=prefix)
app.include_router(uploads.router, prefix=prefix)
app.include_router(audit.router, prefix=prefix)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global error on {request.method} {request.url}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please try again later."},
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
