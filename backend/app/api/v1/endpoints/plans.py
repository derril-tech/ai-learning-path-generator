from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter()

@router.post("/")
async def create_plan():
    """Create learning plan - TODO: Implement plan creation"""
    # TODO: Validate plan data
    # TODO: Use AI planner to generate plan
    # TODO: Save plan to database
    # TODO: Return plan with steps and citations
    raise HTTPException(status_code=501, detail="Not implemented yet")

@router.get("/")
async def list_plans():
    """List learning plans - TODO: Implement plans listing"""
    # TODO: Add pagination and filtering
    # TODO: Retrieve plans from database
    # TODO: Return plans list
    raise HTTPException(status_code=501, detail="Not implemented yet")

@router.get("/{plan_id}")
async def get_plan(plan_id: str):
    """Get plan details - TODO: Implement plan retrieval"""
    # TODO: Validate plan_id
    # TODO: Retrieve plan from database
    # TODO: Return plan details with steps
    raise HTTPException(status_code=501, detail="Not implemented yet")
