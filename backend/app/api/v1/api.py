from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    learners,
    skills,
    content,
    plans,
    assessments,
    coach,
    calendar,
    analytics
)

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(learners.router, prefix="/learners", tags=["learners"])
api_router.include_router(skills.router, prefix="/skills", tags=["skills"])
api_router.include_router(content.router, prefix="/content", tags=["content"])
api_router.include_router(plans.router, prefix="/plans", tags=["plans"])
api_router.include_router(assessments.router, prefix="/assessments", tags=["assessments"])
api_router.include_router(coach.router, prefix="/coach", tags=["coach"])
api_router.include_router(calendar.router, prefix="/calendar", tags=["calendar"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
