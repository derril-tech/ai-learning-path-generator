from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.redis import get_redis

health_router = APIRouter()

@health_router.get("/")
async def health_check():
    """Basic health check endpoint"""
    return {
        "status": "healthy",
        "service": "Learning Path Generator API",
        "version": "1.0.0"
    }

@health_router.get("/ready")
async def readiness_check(db: AsyncSession = Depends(get_db)):
    """Readiness check including database connectivity"""
    try:
        # Test database connection
        await db.execute("SELECT 1")
        
        # Test Redis connection
        redis = await get_redis()
        await redis.ping()
        
        return {
            "status": "ready",
            "database": "connected",
            "redis": "connected"
        }
    except Exception as e:
        return {
            "status": "not_ready",
            "error": str(e)
        }

@health_router.get("/live")
async def liveness_check():
    """Liveness check for Kubernetes"""
    return {
        "status": "alive",
        "timestamp": "2024-01-01T00:00:00Z"
    }
