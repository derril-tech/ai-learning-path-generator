# API Version 1 Directory Instructions

## Overview
This directory contains version 1 of the Learning Path Generator API. It includes the main API router and all endpoint implementations organized by domain.

## Structure
- `api.py` - Main API router that includes all endpoint routers
- `endpoints/` - Domain-specific endpoint modules

## API Version 1 Endpoints

### Authentication (`/auth`)
- `POST /login` - User authentication
- `POST /refresh` - Token refresh
- `POST /logout` - User logout

### Learners (`/learners`)
- `GET /me` - Get current learner profile
- `PUT /me` - Update current learner profile

### Skills (`/skills`)
- `GET /` - List available skills with filtering
- `GET /{skill_id}` - Get detailed skill information

### Content (`/content`)
- `GET /search` - Search learning content
- `GET /{content_id}` - Get detailed content information

### Plans (`/plans`)
- `POST /` - Create new learning plan
- `GET /` - List learner's plans
- `GET /{plan_id}` - Get detailed plan information
- `PUT /{plan_id}/steps/{step_id}/progress` - Update step progress

### Assessments (`/assessments`)
- `GET /` - List learner's assessments
- `GET /{assessment_id}` - Get detailed assessment
- `POST /{assessment_id}/attempts` - Start assessment attempt
- `PUT /{assessment_id}/attempts/{attempt_id}` - Submit assessment

### Coach (`/coach`)
- `POST /chat` - Send message to AI coach
- `GET /chat` - Get conversation history
- `GET /chat/stream` - WebSocket for real-time chat

### Calendar (`/calendar`)
- `GET /events` - Get calendar events
- `POST /events` - Create calendar event

### Analytics (`/analytics`)
- `GET /progress` - Get learning progress analytics
- `GET /team` - Get team analytics (admin only)

## Implementation Guidelines
1. **Endpoint Structure**: Each endpoint module should export a FastAPI router
2. **Dependencies**: Use proper dependency injection for auth, database, etc.
3. **Validation**: Use Pydantic models for request/response validation
4. **Error Handling**: Follow consistent error response format
5. **Documentation**: Include comprehensive docstrings and examples
6. **Testing**: Write comprehensive tests for all endpoints

## TODO Items
- [ ] Implement business logic for all placeholder endpoints
- [ ] Add comprehensive input validation and sanitization
- [ ] Implement proper authentication and authorization
- [ ] Add caching for frequently accessed data
- [ ] Create WebSocket endpoints for real-time features
- [ ] Implement file upload endpoints
- [ ] Add batch operations for bulk data processing
- [ ] Create admin endpoints for system management

## Security Considerations
- Validate all input data
- Implement proper authentication and authorization
- Use HTTPS for all communications
- Apply rate limiting to prevent abuse
- Sanitize output to prevent XSS attacks
- Log security-relevant events
- Follow OWASP security guidelines
