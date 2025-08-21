# API Endpoints Directory Instructions

This directory contains all FastAPI endpoint modules for the Learning Path Generator backend.

## Directory Structure

```
endpoints/
├── auth.py              # Authentication endpoints
├── learners.py          # Learner profile endpoints
├── skills.py            # Skill management endpoints
├── content.py           # Content search and management
├── plans.py             # Learning plan endpoints
├── assessments.py       # Assessment endpoints
├── coach.py             # AI coach endpoints
├── calendar.py          # Calendar integration
├── analytics.py         # Analytics and reporting
└── _INSTRUCTIONS.md     # This file
```

## Endpoint Guidelines

### 1. File Structure
Each endpoint file should follow this structure:

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas import RequestSchema, ResponseSchema
from app.services import ServiceClass

router = APIRouter()

@router.get("/", response_model=ResponseSchema)
async def get_items(
    db: AsyncSession = Depends(get_db),
    # other dependencies
):
    """Get items endpoint description."""
    try:
        # Business logic here
        return ResponseSchema(...)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### 2. Response Format
All endpoints should return consistent response format:

```python
from app.core.response import success_response, error_response

@router.get("/")
async def get_items():
    try:
        data = await service.get_items()
        return success_response(data=data, message="Items retrieved successfully")
    except Exception as e:
        return error_response(code="INTERNAL_ERROR", message=str(e))
```

### 3. Error Handling
- Use appropriate HTTP status codes
- Return structured error responses
- Log errors for debugging
- Don't expose sensitive information

### 4. Authentication & Authorization
- Use dependency injection for auth
- Check user permissions
- Validate tenant access for multi-tenant setup

## TODO: Required Endpoints

### Authentication (`auth.py`)
- [ ] POST `/login` - User login
- [ ] POST `/refresh` - Refresh access token
- [ ] POST `/logout` - User logout
- [ ] POST `/register` - User registration
- [ ] POST `/forgot-password` - Password reset request
- [ ] POST `/reset-password` - Password reset

### Learners (`learners.py`)
- [ ] GET `/me` - Get current learner profile
- [ ] PUT `/me` - Update learner profile
- [ ] GET `/me/goals` - Get learning goals
- [ ] PUT `/me/goals` - Update learning goals
- [ ] GET `/me/progress` - Get learning progress
- [ ] POST `/me/import-history` - Import learning history

### Skills (`skills.py`)
- [ ] GET `/` - List all skills with filtering
- [ ] GET `/{skill_id}` - Get skill details
- [ ] GET `/{skill_id}/prerequisites` - Get skill prerequisites
- [ ] GET `/{skill_id}/related` - Get related skills
- [ ] GET `/domains` - Get skill domains
- [ ] GET `/search` - Search skills

### Content (`content.py`)
- [ ] GET `/search` - Search content with filters
- [ ] GET `/{content_id}` - Get content details
- [ ] GET `/providers` - List content providers
- [ ] GET `/recommendations` - Get personalized recommendations
- [ ] POST `/feedback` - Submit content feedback
- [ ] GET `/trending` - Get trending content

### Plans (`plans.py`)
- [ ] POST `/` - Create new learning plan
- [ ] GET `/` - List user's plans
- [ ] GET `/{plan_id}` - Get plan details
- [ ] PUT `/{plan_id}` - Update plan
- [ ] DELETE `/{plan_id}` - Delete plan
- [ ] POST `/{plan_id}/replan` - Trigger plan regeneration
- [ ] GET `/{plan_id}/steps` - Get plan steps
- [ ] PUT `/{plan_id}/steps/{step_id}` - Update step status

### Assessments (`assessments.py`)
- [ ] GET `/` - List available assessments
- [ ] GET `/{assessment_id}` - Get assessment details
- [ ] POST `/{assessment_id}/attempts` - Submit assessment attempt
- [ ] GET `/attempts/{attempt_id}` - Get attempt results
- [ ] GET `/diagnostics` - Get diagnostic assessments
- [ ] POST `/diagnostics/start` - Start diagnostic assessment

### Coach (`coach.py`)
- [ ] POST `/chat` - Chat with AI coach
- [ ] GET `/chat/stream` - Stream chat responses
- [ ] POST `/chat/summarize` - Summarize learning session
- [ ] POST `/chat/explain` - Explain concept
- [ ] POST `/chat/quiz` - Generate quiz questions
- [ ] GET `/suggestions` - Get learning suggestions

### Calendar (`calendar.py`)
- [ ] GET `/events` - Get scheduled events
- [ ] POST `/events` - Schedule learning session
- [ ] PUT `/events/{event_id}` - Update event
- [ ] DELETE `/events/{event_id}` - Cancel event
- [ ] POST `/sync` - Sync with external calendar
- [ ] GET `/availability` - Check availability

### Analytics (`analytics.py`)
- [ ] GET `/progress` - Get learning progress
- [ ] GET `/skills` - Get skill analytics
- [ ] GET `/time` - Get time tracking analytics
- [ ] GET `/completion` - Get completion rates
- [ ] GET `/team` - Get team analytics (admin)
- [ ] GET `/roi` - Get ROI metrics (admin)

## Implementation Notes

### 1. Database Operations
- Use async SQLAlchemy operations
- Implement proper error handling
- Use transactions where appropriate
- Optimize queries for performance

### 2. Validation
- Use Pydantic models for request/response validation
- Implement custom validators where needed
- Validate business rules in service layer

### 3. Security
- Implement rate limiting
- Validate input data
- Use parameterized queries
- Implement proper CORS

### 4. Performance
- Use caching where appropriate
- Implement pagination for list endpoints
- Optimize database queries
- Use background tasks for heavy operations

## Example Implementation

### Good Endpoint Example
```python
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.core.database import get_db
from app.core.auth import get_current_user
from app.schemas.plan import PlanCreate, PlanResponse, PlanList
from app.services.plan import PlanService
from app.core.response import success_response, error_response

router = APIRouter()

@router.post("/", response_model=PlanResponse)
async def create_plan(
    plan_data: PlanCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Create a new learning plan."""
    try:
        plan_service = PlanService(db)
        plan = await plan_service.create_plan(
            user_id=current_user.id,
            plan_data=plan_data
        )
        return success_response(
            data=plan,
            message="Learning plan created successfully"
        )
    except ValueError as e:
        return error_response(
            code="VALIDATION_ERROR",
            message=str(e)
        )
    except Exception as e:
        return error_response(
            code="INTERNAL_ERROR",
            message="Failed to create learning plan"
        )

@router.get("/", response_model=PlanList)
async def list_plans(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    status: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """List user's learning plans."""
    try:
        plan_service = PlanService(db)
        plans, total = await plan_service.list_plans(
            user_id=current_user.id,
            page=page,
            per_page=per_page,
            status=status
        )
        return success_response(
            data={
                "plans": plans,
                "pagination": {
                    "page": page,
                    "per_page": per_page,
                    "total": total,
                    "pages": (total + per_page - 1) // per_page
                }
            }
        )
    except Exception as e:
        return error_response(
            code="INTERNAL_ERROR",
            message="Failed to retrieve learning plans"
        )
```

### Bad Endpoint Example
```python
# ❌ Avoid: No error handling, no validation, no proper structure
@router.get("/")
def get_plans():
    return {"plans": []}  # No error handling, no validation
```

Follow these guidelines to maintain consistency and quality across all endpoints.
