from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter()

@router.get("/me")
async def get_learner_profile():
    """Get current learner profile - TODO: Implement profile retrieval"""
    # TODO: Get current user from JWT token
    # TODO: Retrieve learner profile from database
    # TODO: Return profile data
    raise HTTPException(status_code=501, detail="Not implemented yet")

@router.put("/me")
async def update_learner_profile():
    """Update learner profile - TODO: Implement profile update"""
    # TODO: Validate profile data
    # TODO: Update learner profile in database
    # TODO: Return updated profile
    raise HTTPException(status_code=501, detail="Not implemented yet")
