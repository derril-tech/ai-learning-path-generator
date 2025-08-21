import redis.asyncio as redis
from app.core.config import settings

# Redis connection pool
redis_pool = redis.ConnectionPool.from_url(
    settings.REDIS_URL,
    password=settings.REDIS_PASSWORD,
    decode_responses=True,
    max_connections=20
)

async def get_redis() -> redis.Redis:
    """Get Redis connection"""
    return redis.Redis(connection_pool=redis_pool)

async def close_redis():
    """Close Redis connection pool"""
    await redis_pool.disconnect()
