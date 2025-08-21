# Repository Map - Learning Path Generator

## Overview
This is a full-stack monorepo for an AI-driven learning path generator that creates personalized, skill-based learning paths for employees and learners. The application uses Next.js 14 for the frontend and FastAPI for the backend, with AI orchestration via LangGraph and LangChain.

## Repository Structure

### Root Level
```
ai-learning-path-generator/
├── frontend/                 # Next.js 14 frontend application
├── backend/                  # FastAPI backend application
├── docs/                     # Documentation and specifications
├── PROJECT_BRIEF.md          # Complete project requirements and 8-step plan
├── PROMPT_DECLARATION.md     # AI collaboration guidelines
└── README.md                 # Main project README
```

### Frontend (`frontend/`)
```
frontend/
├── app/                      # Next.js 14 App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Global styles and Tailwind
│   ├── dashboard/           # Dashboard with learning progress
│   ├── plan/                # Detailed learning plan view
│   ├── coach/               # AI coach chat interface
│   ├── catalog/             # Content catalog (TODO)
│   ├── assess/              # Assessment interface (TODO)
│   ├── admin/               # Admin panel (TODO)
│   ├── settings/            # User settings (TODO)
│   └── _INSTRUCTIONS.md     # App directory guidelines
├── components/              # Reusable React components
│   ├── providers.tsx        # React Query provider
│   └── _INSTRUCTIONS.md     # Component development guidelines
├── types/                   # TypeScript type definitions
│   └── index.ts             # Core domain types
├── data/                    # Mock data and fixtures
│   └── mockData.ts          # Sample data for development
├── package.json             # Frontend dependencies
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── .env.example             # Frontend environment variables
└── README.md                # Frontend-specific documentation
```

### Backend (`backend/`)
```
backend/
├── app/                     # FastAPI application
│   ├── main.py             # Application entry point
│   ├── core/               # Core application modules
│   │   ├── config.py       # Application settings
│   │   ├── database.py     # Database configuration
│   │   ├── redis.py        # Redis configuration
│   │   └── health.py       # Health check endpoints
│   ├── models/             # SQLAlchemy ORM models
│   │   ├── __init__.py     # Model imports
│   │   ├── base.py         # Base model class
│   │   ├── user.py         # User authentication
│   │   ├── learner.py      # Learner profiles
│   │   ├── skill.py        # Skills and relationships
│   │   ├── content.py      # Content providers/items
│   │   ├── plan.py         # Learning plans/steps
│   │   ├── assessment.py   # Assessments/attempts
│   │   ├── coach.py        # AI coach messages
│   │   ├── calendar.py     # Calendar events
│   │   ├── citation.py     # Content citations
│   │   └── _INSTRUCTIONS.md # Model guidelines
│   ├── api/                # API endpoints
│   │   └── v1/             # API version 1
│   │       ├── api.py      # Main API router
│   │       └── endpoints/  # Individual endpoint modules
│   │           ├── auth.py # Authentication endpoints
│   │           ├── learners.py
│   │           ├── skills.py
│   │           ├── content.py
│   │           ├── plans.py
│   │           ├── assessments.py
│   │           ├── coach.py
│   │           ├── calendar.py
│   │           ├── analytics.py
│   │           └── _INSTRUCTIONS.md # Endpoint guidelines
│   └── services/           # Business logic services (TODO)
├── requirements.txt        # Python dependencies
├── .env.example           # Backend environment variables
└── README.md              # Backend-specific documentation
```

### Documentation (`docs/`)
```
docs/
├── REPO_MAP.md            # This file - repository structure
├── API_SPEC.md            # API endpoints and schemas
├── CLAUDE.md              # AI collaboration guidelines
└── PROMPT_DECLARATION.md  # AI prompt specifications
```

## Key Technologies

### Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Query (server state), Zustand (client state)
- **UI Components**: Lucide React icons, custom components
- **Forms**: React Hook Form with Zod validation
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

### Backend Stack
- **Framework**: FastAPI (async)
- **Language**: Python 3.11+
- **Database**: PostgreSQL with pgvector
- **ORM**: SQLAlchemy (async) with Alembic migrations
- **Caching**: Redis
- **AI Orchestration**: LangGraph on LangChain
- **AI Models**: OpenAI GPT-4/4o, Anthropic Claude
- **Authentication**: JWT with python-jose
- **Background Tasks**: Celery with Redis
- **Documentation**: Auto-generated with FastAPI

### AI & ML Stack
- **Orchestration**: LangGraph for deterministic flows
- **RAG**: Hybrid BM25 + vector search with pgvector
- **Embeddings**: OpenAI text-embedding-ada-002
- **Re-ranking**: Cross-encoder models
- **Knowledge Tracing**: Bayesian Knowledge Tracing (BKT)

## Development Workflow

### Frontend Development
1. **Setup**: `cd frontend && npm install`
2. **Development**: `npm run dev`
3. **Build**: `npm run build`
4. **Testing**: `npm run test`

### Backend Development
1. **Setup**: `cd backend && pip install -r requirements.txt`
2. **Development**: `uvicorn app.main:app --reload`
3. **Database**: PostgreSQL with pgvector extension
4. **Redis**: For caching and background tasks

### Environment Configuration
- **Frontend**: Copy `frontend/.env.example` to `frontend/.env.local`
- **Backend**: Copy `backend/.env.example` to `backend/.env`
- **Database**: PostgreSQL with pgvector extension
- **Redis**: For caching and task queues

## Architecture Patterns

### Frontend Architecture
- **App Router**: Next.js 14 file-based routing
- **Server Components**: Default, with client components as needed
- **State Management**: React Query for server state, Zustand for UI state
- **Styling**: Tailwind CSS with custom design system
- **Type Safety**: Full TypeScript coverage

### Backend Architecture
- **API Design**: RESTful with OpenAPI documentation
- **Database**: PostgreSQL with pgvector for embeddings
- **Caching**: Redis for session storage and caching
- **Background Tasks**: Celery for async processing
- **AI Integration**: LangGraph for orchestration, LangChain for tools

### Data Flow
1. **User Input**: Frontend forms and interactions
2. **API Calls**: React Query handles server state
3. **Backend Processing**: FastAPI endpoints with business logic
4. **AI Processing**: LangGraph orchestrates AI workflows
5. **Database**: PostgreSQL stores structured data
6. **Caching**: Redis caches frequently accessed data
7. **Real-time**: WebSocket connections for live updates

## Security & Compliance

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Role-based Access**: User, Admin, Manager roles
- **Multi-tenant**: Tenant isolation for enterprise customers
- **SSO Integration**: Support for Okta, Azure AD, Google Workspace

### Data Protection
- **PII Handling**: Secure storage and processing of personal data
- **Encryption**: Data encryption at rest and in transit
- **Audit Logging**: Comprehensive audit trails
- **GDPR Compliance**: Data residency and deletion controls

## Deployment & Infrastructure

### Frontend Deployment
- **Platform**: Vercel (recommended) or any static hosting
- **Build**: Next.js static export or server-side rendering
- **CDN**: Global content delivery network
- **Environment**: Production, staging, development

### Backend Deployment
- **Platform**: Docker containers on Kubernetes or cloud platforms
- **Database**: Managed PostgreSQL with pgvector
- **Caching**: Managed Redis instance
- **Monitoring**: Health checks, metrics, and logging

## Development Guidelines

### Code Quality
- **Linting**: ESLint for frontend, flake8 for backend
- **Formatting**: Prettier for frontend, Black for backend
- **Type Checking**: TypeScript for frontend, mypy for backend
- **Testing**: Jest for frontend, pytest for backend

### Git Workflow
- **Branching**: Feature branches with pull requests
- **Commits**: Conventional commit messages
- **Code Review**: Required for all changes
- **CI/CD**: Automated testing and deployment

### Documentation
- **API Docs**: Auto-generated with FastAPI
- **Component Docs**: Storybook for frontend components
- **Architecture**: This REPO_MAP.md and related docs
- **User Guides**: In-app help and external documentation

## TODO & Roadmap

### Immediate (Step 2-4)
- [x] Complete frontend page implementations
- [x] Implement backend business logic
- [x] Add database migrations
- [x] Create comprehensive documentation

### Short-term
- [ ] Add comprehensive testing suite
- [ ] Implement CI/CD pipeline
- [ ] Add monitoring and logging
- [ ] Performance optimization

### Long-term
- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] Enterprise integrations
- [ ] Internationalization

## File Editing Boundaries

### Editable Files
- All source code in `frontend/` and `backend/`
- Documentation in `docs/` (except this REPO_MAP.md)
- Configuration files (package.json, requirements.txt, etc.)
- Environment examples (.env.example)

### Do Not Touch
- `PROJECT_BRIEF.md` - Core project requirements
- `docs/REPO_MAP.md` - This file (repository structure)
- `.gitignore` - Git ignore patterns
- License files

### Guidelines for AI Assistance
- Follow existing patterns and conventions
- Maintain type safety and error handling
- Add appropriate documentation and comments
- Test changes thoroughly
- Update related documentation when needed
