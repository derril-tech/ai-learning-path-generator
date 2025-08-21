# Learning Path Generator - Backend

The FastAPI backend application for the Learning Path Generator, featuring AI-powered learning path planning, RAG-based content recommendations, and comprehensive analytics.

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL 14+
- Redis 6+
- Virtual environment (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-learning-path-generator/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database**
   ```bash
   # Create database
   createdb learning_path_db
   
   # Run migrations
   alembic upgrade head
   ```

6. **Start development server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

7. **Access API documentation**
   Navigate to [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

```
backend/
├── app/                    # Main application code
│   ├── api/v1/            # API version 1
│   │   ├── endpoints/     # Individual endpoint modules
│   │   └── api.py         # Main API router
│   ├── core/              # Core configuration
│   │   ├── config.py      # Settings and environment
│   │   ├── database.py    # Database connection
│   │   ├── redis.py       # Redis connection
│   │   └── health.py      # Health check endpoints
│   ├── models/            # SQLAlchemy database models
│   ├── schemas/           # Pydantic request/response models
│   ├── services/          # Business logic services
│   │   ├── ai/            # AI and LangGraph services
│   │   ├── rag/           # RAG services
│   │   ├── planner/       # Learning path planning
│   │   └── assessment/    # Assessment services
│   ├── workers/           # Background task workers
│   └── utils/             # Utility functions
├── alembic/               # Database migrations
├── tests/                 # Test files
├── main.py                # Application entry point
├── requirements.txt       # Python dependencies
└── alembic.ini           # Alembic configuration
```

## 🛠️ Available Scripts

- `uvicorn main:app --reload` - Start development server
- `pytest` - Run tests
- `pytest --cov=app` - Run tests with coverage
- `alembic revision --autogenerate -m "description"` - Create migration
- `alembic upgrade head` - Apply migrations
- `black .` - Format code
- `isort .` - Sort imports
- `flake8 .` - Lint code
- `mypy app` - Type checking

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost/learning_path_db

# Redis
REDIS_URL=redis://localhost:6379/0

# AI Services
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# Security
SECRET_KEY=your-super-secret-key
```

### Database Setup

1. **Install PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql
   ```

2. **Create database**
   ```bash
   createdb learning_path_db
   ```

3. **Run migrations**
   ```bash
   alembic upgrade head
   ```

### Redis Setup

1. **Install Redis**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install redis-server
   
   # macOS
   brew install redis
   ```

2. **Start Redis**
   ```bash
   redis-server
   ```

## 📊 Database Schema

### Core Tables

- **users** - User accounts and authentication
- **learners** - Learner profiles and preferences
- **skills** - Skill definitions and metadata
- **skill_edges** - Skill relationships and prerequisites
- **content_providers** - External content providers
- **content_items** - Learning content metadata
- **plans** - Learning plans
- **plan_steps** - Individual steps in learning plans
- **assessments** - Assessment definitions
- **assessment_attempts** - Assessment submissions and results
- **citations** - Source citations for recommendations

### Key Relationships

```sql
-- Skills and prerequisites
skills -> skill_edges -> skills

-- Learning plans
learners -> plans -> plan_steps -> content_items

-- Assessments
learners -> assessment_attempts -> assessments

-- Content
content_providers -> content_items -> skills
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - User logout

### Learners
- `GET /api/v1/learners/me` - Get profile
- `PUT /api/v1/learners/me` - Update profile

### Skills
- `GET /api/v1/skills` - List skills
- `GET /api/v1/skills/{id}` - Get skill details

### Content
- `GET /api/v1/content/search` - Search content
- `GET /api/v1/content/{id}` - Get content details

### Plans
- `POST /api/v1/plans` - Create plan
- `GET /api/v1/plans` - List plans
- `GET /api/v1/plans/{id}` - Get plan details

### Assessments
- `GET /api/v1/assessments` - List assessments
- `POST /api/v1/assessments/{id}/attempts` - Submit attempt

### Coach
- `POST /api/v1/coach/chat` - Chat with AI coach
- `GET /api/v1/coach/chat/stream` - Stream chat

### Analytics
- `GET /api/v1/analytics/progress` - Get progress analytics
- `GET /api/v1/analytics/team` - Get team analytics

## 🤖 AI Services

### LangGraph Agents

1. **Diagnostician** - Assesses learner's current knowledge
2. **Retriever** - Finds relevant learning content
3. **Planner** - Creates personalized learning paths
4. **Verifier** - Validates plan feasibility
5. **Scheduler** - Optimizes learning schedule
6. **Explainer** - Provides explanations and reasoning

### RAG System

- **Content Indexing**: Vector embeddings of learning content
- **Hybrid Search**: BM25 + vector similarity
- **Re-ranking**: Cross-encoder for relevance scoring
- **Citation Tracking**: Source attribution for all recommendations

## 🧪 Testing

### Test Structure

```
tests/
├── unit/                  # Unit tests
├── integration/           # Integration tests
├── api/                   # API endpoint tests
├── conftest.py           # Test configuration
└── fixtures/             # Test data fixtures
```

### Running Tests

```bash
# All tests
pytest

# Specific test file
pytest tests/test_plans.py

# With coverage
pytest --cov=app --cov-report=html

# Integration tests only
pytest tests/integration/
```

### Test Database

Tests use a separate test database:

```bash
# Create test database
createdb learning_path_test

# Set test environment
export DATABASE_URL=postgresql://user:password@localhost/learning_path_test
pytest
```

## 📦 Deployment

### Docker

```bash
# Build image
docker build -t learning-path-backend .

# Run container
docker run -p 8000:8000 learning-path-backend
```

### Production

1. **Set production environment**
   ```bash
   export ENVIRONMENT=production
   export DEBUG=false
   ```

2. **Use production server**
   ```bash
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

3. **Set up reverse proxy (nginx)**
   ```nginx
   server {
       listen 80;
       server_name api.learningpath.com;
       
       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## 🔒 Security

### Authentication
- JWT-based authentication
- Refresh token rotation
- Password hashing with bcrypt

### Authorization
- Role-based access control (RBAC)
- Tenant isolation for multi-tenancy
- API key management for external services

### Data Protection
- Encryption at rest (AES-256)
- TLS 1.2+ for data in transit
- Field-level encryption for PII

### Rate Limiting
- Per-endpoint rate limits
- IP-based throttling
- Token bucket algorithm

## 📊 Monitoring

### Health Checks
- `GET /health` - Basic health check
- `GET /health/ready` - Readiness check
- `GET /health/live` - Liveness check

### Logging
- Structured JSON logging
- Correlation IDs for request tracking
- Log levels: DEBUG, INFO, WARNING, ERROR

### Metrics
- Request/response metrics
- Database query performance
- AI service latency
- Error rates and types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run linting and type checking
6. Submit a pull request

### Code Style
- Follow PEP 8 guidelines
- Use type hints for all functions
- Write docstrings for public APIs
- Use Black for code formatting

## 📚 Documentation

- [API Specification](../docs/API_SPEC.md)
- [Database Schema](../docs/DATABASE.md)
- [AI Services](../docs/AI_SERVICES.md)
- [Deployment Guide](../docs/DEPLOYMENT.md)

## 🐛 Troubleshooting

### Common Issues

**Database Connection**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -h localhost -U user -d learning_path_db
```

**Redis Connection**
```bash
# Check Redis status
redis-cli ping

# Test connection
redis-cli -h localhost -p 6379
```

**Migration Issues**
```bash
# Reset migrations
alembic downgrade base
alembic upgrade head
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [documentation](../docs/)
- Open an issue on GitHub
- Contact the development team
