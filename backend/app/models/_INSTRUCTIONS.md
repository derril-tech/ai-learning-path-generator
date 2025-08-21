# Backend Models Directory Instructions

## Overview
This directory contains SQLAlchemy ORM models for the Learning Path Generator database. All models inherit from `BaseModel` and follow consistent patterns.

## Structure
- `__init__.py` - Model imports and exports
- `base.py` - Base model with common fields and methods
- `user.py` - User authentication and profile
- `learner.py` - Learner profile, goals, and preferences
- `skill.py` - Skills and skill relationships (SkillEdge)
- `content.py` - Content providers and items
- `plan.py` - Learning plans and plan steps
- `assessment.py` - Assessments and attempts
- `coach.py` - AI coach messages
- `calendar.py` - Calendar events and scheduling
- `citation.py` - Content citations and references

## Guidelines
1. **Model Structure**: All models inherit from `BaseModel` for common fields
2. **Relationships**: Use SQLAlchemy relationships with proper back_populates
3. **Enums**: Use Python enums for constrained choice fields
4. **JSON Fields**: Use JSON columns for flexible metadata storage
5. **Indexing**: Add indexes on frequently queried fields
6. **Validation**: Use Pydantic for API request/response validation
7. **Documentation**: Include docstrings for all models and methods

## Database Design Principles
- **Normalization**: Follow 3NF where possible, denormalize for performance when needed
- **Consistency**: Use consistent naming conventions (snake_case for columns)
- **Flexibility**: Use JSON fields for metadata that may change frequently
- **Performance**: Add appropriate indexes and consider query patterns
- **Scalability**: Design for multi-tenant architecture

## TODO Items
- [ ] Add database migrations with Alembic
- [ ] Create seed data scripts for development
- [ ] Add model validation with Pydantic
- [ ] Implement soft deletes for data retention
- [ ] Add audit logging for sensitive operations
- [ ] Create model factories for testing
- [ ] Add database constraints and triggers
- [ ] Implement caching strategies for frequently accessed data

## Naming Conventions
- **Tables**: Use plural, snake_case (e.g., `learning_plans`)
- **Columns**: Use snake_case (e.g., `created_at`, `user_id`)
- **Relationships**: Use descriptive names (e.g., `plan_steps`, `assessment_attempts`)
- **Enums**: Use PascalCase (e.g., `PlanStatus`, `AssessmentType`)

## Best Practices
- Always include `created_at` and `updated_at` timestamps
- Use UUIDs for primary keys to avoid sequential ID issues
- Add proper foreign key constraints
- Include helpful class methods for common queries
- Use type hints for better code documentation
- Keep models focused on data structure, business logic goes in services
