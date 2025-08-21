# Backend Core Directory Instructions

## Overview
This directory contains the core infrastructure and configuration modules for the FastAPI backend. These modules provide essential services like database connections, Redis caching, configuration management, and health checks.

## Structure
- `config.py` - Application settings and environment variable management
- `database.py` - Database connection, session management, and initialization
- `redis.py` - Redis connection pool and cache management
- `health.py` - Health check endpoints for monitoring and deployment

## Guidelines
1. **Configuration**: All settings should be defined in `config.py` using Pydantic BaseSettings
2. **Database**: Use async SQLAlchemy with proper session management
3. **Redis**: Use async Redis client with connection pooling
4. **Health Checks**: Implement comprehensive health checks for all dependencies
5. **Error Handling**: Include proper error handling and logging
6. **Security**: Follow security best practices for connection strings and secrets

## TODO Items
- [ ] Add database migration management utilities
- [ ] Implement distributed caching strategies
- [ ] Add metrics collection for monitoring
- [ ] Create database backup and restore utilities
- [ ] Implement connection retry logic with exponential backoff
- [ ] Add database connection pooling optimization
- [ ] Create health check aggregation and reporting
- [ ] Add configuration validation and environment-specific overrides

## Best Practices
- Use environment variables for all configuration
- Implement proper connection lifecycle management
- Add comprehensive logging for debugging
- Use type hints for better code documentation
- Follow async/await patterns consistently
- Implement proper error handling and recovery
