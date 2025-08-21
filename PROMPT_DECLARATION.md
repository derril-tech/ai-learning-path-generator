# Learning Path Generator - AI Development Prompt

## Project Overview

You are developing a **Learning Path Generator**, an AI-driven platform that creates personalized, skill-based learning paths for employees and learners. The system ingests goals, role frameworks, prior knowledge, and enterprise knowledge to compose sequenced, time-bound plans that continuously adapt using diagnostics and mastery signals.

### Core Value Proposition
- **Personalized Learning**: AI-generated paths based on individual goals and prior knowledge
- **Adaptive Progression**: Plans continuously adapt using diagnostics and mastery signals
- **Explainable AI**: Every recommendation includes citations and reasoning
- **Enterprise Integration**: Seamless integration with existing LMS/LRS and content providers
- **Compliance Ready**: Full audit trails, GDPR compliance, and enterprise security

## Technology Stack

### Frontend Architecture
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Query (server state) + Zustand (client state)
- **UI Components**: Lucide React icons, custom component library
- **Forms**: React Hook Form with Zod validation
- **Data Visualization**: Recharts for progress and analytics
- **Real-time**: WebSocket connections for live updates

### Backend Architecture
- **Framework**: FastAPI (async) with Python 3.11+
- **Database**: PostgreSQL with pgvector extension for embeddings
- **ORM**: SQLAlchemy (async) with Alembic migrations
- **Caching**: Redis for session storage and caching
- **AI Orchestration**: LangGraph on LangChain for deterministic flows
- **AI Models**: OpenAI GPT-4/4o (planning) + Anthropic Claude (explanations)
- **Background Tasks**: Celery with Redis for async processing
- **Authentication**: JWT tokens with role-based access control

### AI & ML Stack
- **RAG System**: Hybrid BM25 + vector search with cross-encoder re-ranking
- **Knowledge Tracing**: Bayesian Knowledge Tracing (BKT) for mastery assessment
- **Content Intelligence**: De-duplication, quality scoring, license tagging
- **Explainability**: Citation tracking with confidence scores

## Frontend/Backend Boundaries

### Frontend Responsibilities
- **User Interface**: All UI components, pages, and user interactions
- **Client State**: UI state, form data, temporary user preferences
- **Data Presentation**: Charts, graphs, progress visualization
- **Real-time Updates**: WebSocket handling for live progress updates
- **Routing**: Page navigation and URL management
- **Form Validation**: Client-side validation before API submission
- **Error Handling**: User-friendly error messages and recovery flows

### Backend Responsibilities
- **Business Logic**: Learning path generation, skill assessment, content recommendation
- **Data Persistence**: Database operations, caching strategies
- **Authentication**: JWT token management, user sessions, permissions
- **AI Integration**: LangGraph orchestration, model interactions, RAG pipeline
- **External APIs**: LMS/LRS integration, calendar sync, content provider APIs
- **Background Processing**: Content ingestion, embedding generation, plan recomputation
- **Security**: Input validation, rate limiting, data encryption

### Data Contracts
```typescript
// API Response Format
interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

// Error Response Format
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

// Paginated Response Format
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
```

## UX Guidelines

### Design Principles
- **Trust & Clarity**: Every recommendation shows reasoning and citations
- **Progressive Disclosure**: Complex information revealed progressively
- **Accessibility First**: WCAG 2.1 AA compliance, keyboard navigation
- **Mobile Responsive**: Touch-friendly interfaces across all devices
- **Performance**: Sub-3-second page loads, optimistic UI updates

### Design Tokens
```css
/* Color Palette */
--primary-50: #eff6ff;
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Typography */
--font-sans: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Animations */
--duration-fast: 150ms;
--duration-normal: 300ms;
--easing: cubic-bezier(0.4, 0, 0.2, 1);
```

### Interaction Patterns
- **Loading States**: Skeleton screens for content loading
- **Empty States**: Helpful illustrations and clear next actions
- **Error States**: Actionable error messages with recovery options
- **Success States**: Clear confirmation with next step guidance
- **Progressive Enhancement**: Core functionality works without JavaScript

### Accessibility Requirements
- **Semantic HTML**: Proper heading hierarchy, landmarks, form labels
- **Keyboard Navigation**: Full functionality accessible via keyboard
- **Screen Readers**: ARIA labels, descriptions, and live regions
- **Color Contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text
- **Focus Management**: Visible focus indicators, logical tab order

## Performance Budgets

### Frontend Performance
- **Bundle Size**: < 250KB gzipped for initial load
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3 seconds
- **Image Optimization**: WebP format, lazy loading, responsive sizing

### Backend Performance
- **API Response Time**: < 200ms for 95th percentile
- **Database Queries**: < 100ms average query time
- **Memory Usage**: < 512MB per container instance
- **CPU Usage**: < 70% average utilization
- **Cache Hit Rate**: > 90% for frequently accessed data

### Optimization Strategies
- **Code Splitting**: Route-based and component-based splitting
- **Tree Shaking**: Remove unused code from bundles
- **Caching**: Aggressive caching with proper invalidation
- **CDN**: Global content delivery for static assets
- **Database Indexing**: Proper indexes for all query patterns

## Security Constraints

### Authentication & Authorization
- **JWT Tokens**: 15-minute access tokens, 7-day refresh tokens
- **Role-Based Access**: Learner, Manager, Admin roles with granular permissions
- **Multi-Tenant**: Complete data isolation between tenants
- **Session Management**: Secure session handling with proper logout

### Data Protection
- **PII Handling**: Encrypt sensitive data at rest and in transit
- **Input Validation**: Validate and sanitize all user inputs
- **SQL Injection**: Use parameterized queries, ORM protection
- **XSS Prevention**: Content Security Policy, output encoding
- **CSRF Protection**: CSRF tokens for state-changing operations

### Rate Limiting
- **API Endpoints**: 1000 requests/hour for authenticated users
- **Authentication**: 5 login attempts per IP per minute
- **File Uploads**: 10 uploads per hour, max 10MB per file
- **Assessment Attempts**: 5 attempts per assessment per day

### Compliance
- **GDPR**: Data residency controls, right to deletion, consent management
- **SOC 2**: Audit logging, access controls, data encryption
- **FERPA**: Educational record protection for learning data

## Testing Expectations

### Frontend Testing
- **Unit Tests**: 80%+ coverage for utility functions and hooks
- **Component Tests**: React Testing Library for component behavior
- **Integration Tests**: API integration and user flow testing
- **E2E Tests**: Playwright for critical user journeys
- **Visual Regression**: Chromatic for UI consistency

### Backend Testing
- **Unit Tests**: 90%+ coverage for business logic
- **Integration Tests**: Database operations and external API calls
- **API Tests**: FastAPI test client for endpoint testing
- **Load Tests**: Performance testing under expected load
- **Security Tests**: OWASP compliance, penetration testing

### Testing Patterns
```python
# Backend Test Example
@pytest.mark.asyncio
async def test_create_learning_plan(client: AsyncClient, db: AsyncSession):
    response = await client.post("/api/v1/plans", json={
        "title": "Data Science Fundamentals",
        "objective": "Master core data science skills",
        "target_skills": ["python", "statistics"],
        "time_budget_hours": 120
    })
    assert response.status_code == 201
    assert response.json()["data"]["title"] == "Data Science Fundamentals"
```

```typescript
// Frontend Test Example
import { render, screen, fireEvent } from '@testing-library/react';
import PlanStep from './PlanStep';

test('updates progress when clicked', () => {
  const mockUpdate = jest.fn();
  render(<PlanStep step={mockStep} onProgressUpdate={mockUpdate} />);
  
  fireEvent.click(screen.getByText('Mark Complete'));
  expect(mockUpdate).toHaveBeenCalledWith(mockStep.id, 100);
});
```

## Implementation Guidelines

### Code Quality Standards
- **Type Safety**: 100% TypeScript coverage, strict mode enabled
- **Linting**: ESLint + Prettier for frontend, Black + isort for backend
- **Documentation**: JSDoc for complex functions, docstrings for Python
- **Error Handling**: Comprehensive error boundaries and exception handling
- **Logging**: Structured logging with appropriate levels

### Development Workflow
1. **Feature Branch**: Create feature branch from main
2. **Development**: Write code with tests, follow conventions
3. **Testing**: Run full test suite locally
4. **Code Review**: Peer review required for all changes
5. **CI/CD**: Automated testing, security scanning, deployment

### Database Guidelines
- **Migrations**: All schema changes via Alembic migrations
- **Indexing**: Proper indexes for all query patterns
- **Relationships**: Use foreign keys, maintain referential integrity
- **Soft Deletes**: Implement soft deletes for audit requirements
- **Backup**: Regular backups with point-in-time recovery

## Core Integrations

### LMS/LRS Integration
- **Supported Systems**: Canvas, Moodle, Blackboard, Cornerstone OnDemand
- **Standards**: xAPI/SCORM 1.2/2004 streams to LRS (Learning Locker)
- **Data Flow**: Bidirectional sync of progress, completions, and grades
- **Authentication**: OAuth 2.0, API keys, institutional SSO

### SSO & Identity Management
- **Providers**: Okta, Azure AD, Google Workspace, SAML/OIDC
- **User Provisioning**: SCIM for automated user management
- **Multi-Tenant**: Complete tenant isolation with role-based access
- **Session Management**: Secure token handling with proper logout flows

### Content Provider APIs
- **Course Platforms**: LinkedIn Learning, Coursera, Udemy Business, edX
- **Video Platforms**: YouTube (curated playlists), Vimeo
- **Documentation**: Internal SharePoint, Google Drive, Confluence, Notion
- **Academic**: arXiv, IEEE Xplore, academic institutional repositories
- **License Compliance**: Automatic license tracking and respect for usage terms

### Calendar & Communication
- **Calendar Systems**: Google Calendar, Microsoft 365 (OAuth 2.0)
- **Notifications**: Slack, Microsoft Teams for nudges and reminders
- **Email**: SMTP integration for digest emails and notifications
- **Mobile Push**: Firebase Cloud Messaging for mobile notifications

### Enterprise Systems
- **HRIS Integration**: Workday, SuccessFactors for role frameworks
- **Competency Models**: Import and sync organizational skill frameworks
- **Reporting**: Integration with BI tools (Tableau, Power BI)
- **Payment Processing**: Stripe for subscription and per-seat licensing (B2C)

### AI Services
- **OpenAI**: GPT-4/4o for structured planning, tool calling, content generation
- **Anthropic**: Claude for critique, explanations, champion-challenger setup
- **Embedding Models**: OpenAI text-embedding-ada-002 for semantic search
- **Vector Database**: pgvector with IVFFlat/HNSW indexes for hybrid retrieval
- **Knowledge Tracing**: Bayesian Knowledge Tracing (BKT) for mastery assessment

## Success Criteria

### User Experience
- **Onboarding**: < 5 minutes to create first learning plan
- **Engagement**: > 80% weekly active user rate
- **Completion**: > 70% plan completion rate
- **Satisfaction**: > 4.5/5 user satisfaction score

### Technical Performance
- **Uptime**: 99.9% availability SLA
- **Response Time**: < 200ms API response time
- **Scalability**: Support 10,000+ concurrent users
- **Security**: Zero critical security vulnerabilities

### Business Impact
- **Skill Development**: 40% faster skill acquisition
- **Cost Efficiency**: 30% reduction in training costs
- **Compliance**: 100% audit trail coverage
- **ROI**: Measurable learning outcomes and business impact

## Development Context

### Current Status
- **Infrastructure**: 80% complete with rich, opinionated scaffold
- **Frontend**: Sample pages (dashboard, plan, coach), components, and comprehensive TypeScript types
- **Backend**: Complete API structure, SQLAlchemy models, and FastAPI endpoints with placeholders
- **Documentation**: Comprehensive guides (REPO_MAP.md, API_SPEC.md, CLAUDE.md) and specifications
- **Development Environment**: Fully configured with Tailwind CSS, React Query, Next.js 14 App Router

### Folder Structure Readiness
✅ **Frontend Ready**:
- `frontend/app/` - Pages with dashboard, plan, coach implemented
- `frontend/components/` - Provider setup and component guidelines
- `frontend/types/` - Comprehensive TypeScript domain types
- `frontend/data/` - Mock data and fixtures for development

✅ **Backend Ready**:
- `backend/app/models/` - Complete SQLAlchemy ORM models
- `backend/app/api/v1/endpoints/` - All API endpoints with placeholders and TODO markers
- `backend/app/core/` - Database, Redis, config, and health check setup
- `backend/requirements.txt` - All necessary Python dependencies

✅ **Documentation Ready**:
- `docs/REPO_MAP.md` - Complete repository structure and guidelines
- `docs/API_SPEC.md` - Comprehensive API specification with examples
- `docs/CLAUDE.md` - AI collaboration guidelines and coding conventions

### File Editing Boundaries

#### ✅ SAFE TO EDIT (Claude can modify these):
- **All source code**: `frontend/` and `backend/` directories
- **Configuration files**: `package.json`, `requirements.txt`, `next.config.js`, `tailwind.config.js`
- **Environment templates**: `.env.example` files
- **Component implementations**: All React components and pages
- **API implementations**: FastAPI endpoint logic and business services
- **Database models**: SQLAlchemy model enhancements and relationships
- **Test files**: All testing code and test utilities
- **Documentation**: API docs, component docs, user guides (except core architecture docs)

#### ❌ DO NOT TOUCH (Claude should never modify):
- **PROJECT_BRIEF.md** - Core project requirements and 8-step plan
- **docs/REPO_MAP.md** - Repository structure documentation
- **docs/CLAUDE.md** - AI collaboration guidelines
- **PROMPT_DECLARATION.md** - This file (prompt specifications)
- **.gitignore** - Git ignore patterns
- **Core architectural decisions** - Fundamental tech stack choices

### Immediate Development Priorities
1. **AI Orchestration**: Implement LangGraph workflows for plan generation
2. **RAG Pipeline**: Build content ingestion, embedding, and retrieval system
3. **Assessment Engine**: Implement Bayesian Knowledge Tracing and mastery assessment
4. **Content Intelligence**: Build de-duplication, quality scoring, and license management
5. **Real-time Features**: WebSocket implementation for live progress updates
6. **Integration Layer**: Connect LMS/LRS, calendar, and SSO systems

### Technical Implementation Notes
- **Database Models**: Complete with relationships, use as-is or enhance
- **API Endpoints**: Placeholder implementations with TODO markers - implement business logic
- **Frontend Components**: Sample implementations provided - extend and customize
- **Type Safety**: Comprehensive TypeScript types defined - use consistently
- **Mock Data**: Realistic fixtures available for development and testing

## AI Collaboration Instructions

### Response Style
- **Be Specific**: Provide concrete, actionable code examples
- **Follow Patterns**: Use existing architectural patterns and conventions
- **Type Safety**: Always include proper TypeScript/Python types
- **Error Handling**: Include comprehensive error handling
- **Documentation**: Add comments for complex logic

### Code Standards
- **Consistency**: Follow established naming and structure conventions
- **Performance**: Consider performance implications of implementations
- **Security**: Apply security best practices by default
- **Accessibility**: Ensure UI components are accessible
- **Testing**: Include test examples for new functionality

### When to Ask Questions
- **Ambiguous Requirements**: Ask for clarification on unclear specifications
- **Multiple Approaches**: Present options with trade-offs
- **Breaking Changes**: Confirm before making architectural changes
- **External Dependencies**: Verify integration requirements

This prompt provides comprehensive context for developing the Learning Path Generator with clear boundaries, performance expectations, and quality standards. Follow these guidelines to ensure consistent, high-quality implementation across all components.
