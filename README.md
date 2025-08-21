# Learning Path Generator

AI-driven, role-based upskilling with adaptive plans and verifiable sources.

## 🚀 Overview

The Learning Path Generator is a comprehensive platform that creates personalized, skill-based learning paths for employees and learners. It uses AI to map user goals to skill graphs, builds sequenced plans under time constraints, and continuously adapts using diagnostics and mastery signals.

### Key Features

- **🤖 AI-Powered Planning**: LangGraph-based agents create personalized learning paths
- **📚 Content Intelligence**: RAG-powered content discovery with quality scoring
- **📊 Adaptive Learning**: Continuous assessment and plan adaptation
- **🎯 Skill Mapping**: Prerequisite-aware skill graph navigation
- **📅 Smart Scheduling**: Calendar integration with optimal time allocation
- **🔍 Verifiable Sources**: All recommendations include citations and evidence
- **📈 Analytics**: Comprehensive progress tracking and ROI measurement

## 🏗️ Architecture

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Query** for server state management
- **Zustand** for client state

### Backend
- **FastAPI** for high-performance API
- **PostgreSQL** with pgvector for vector search
- **Redis** for caching and background tasks
- **LangGraph** for AI agent orchestration
- **OpenAI/Anthropic** for AI services

### AI Services
- **Diagnostician**: Assesses current knowledge
- **Retriever**: Finds relevant content
- **Planner**: Creates learning paths
- **Verifier**: Validates plan feasibility
- **Scheduler**: Optimizes time allocation
- **Explainer**: Provides reasoning and citations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Redis 6+

### 1. Clone Repository

```bash
git clone <repository-url>
cd ai-learning-path-generator
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

### 3. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp env.example .env
# Edit .env with your configuration

# Set up database
createdb learning_path_db
alembic upgrade head

# Start server
uvicorn main:app --reload
```

### 4. Access Applications

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

```
ai-learning-path-generator/
├── frontend/                 # Next.js 14 frontend
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   ├── lib/                # Utilities and hooks
│   └── public/             # Static assets
├── backend/                 # FastAPI backend
│   ├── app/                # Application code
│   │   ├── api/v1/         # API endpoints
│   │   ├── core/           # Configuration
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── workers/        # Background tasks
│   ├── alembic/            # Database migrations
│   └── tests/              # Test files
├── docs/                   # Documentation
│   ├── REPO_MAP.md         # Repository structure
│   ├── API_SPEC.md         # API specification
│   └── CLAUDE.md           # AI collaboration guide
├── scripts/                # Development scripts
├── docker/                 # Docker configuration
└── .github/                # GitHub Actions
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_AUTH_DOMAIN=your-auth-domain.auth0.com
NEXT_PUBLIC_AUTH_CLIENT_ID=your-auth-client-id
```

#### Backend (.env)
```bash
DATABASE_URL=postgresql://user:password@localhost/learning_path_db
REDIS_URL=redis://localhost:6379/0
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
SECRET_KEY=your-super-secret-key
```

## 📚 Documentation

- **[Project Brief](PROJECT_BRIEF.md)** - Detailed project requirements and specifications
- **[Repository Map](docs/REPO_MAP.md)** - Complete project structure overview
- **[API Specification](docs/API_SPEC.md)** - REST API endpoints and models
- **[Frontend Guide](frontend/README.md)** - Frontend development guide
- **[Backend Guide](backend/README.md)** - Backend development guide

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

### Backend Tests
```bash
cd backend
pytest
pytest --cov=app --cov-report=html
```

## 🚀 Deployment

### Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment

#### Frontend (Vercel)
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically

#### Backend (Railway/Render)
1. Connect repository to platform
2. Set environment variables
3. Configure database and Redis
4. Deploy

## 🔒 Security

- **Authentication**: JWT-based with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: Encryption at rest and in transit
- **Rate Limiting**: Per-endpoint throttling
- **Input Validation**: Comprehensive request validation
- **Audit Logging**: Complete audit trails

## 📊 Monitoring

- **Health Checks**: `/health` endpoints for monitoring
- **Logging**: Structured JSON logging with correlation IDs
- **Metrics**: Request/response metrics and performance data
- **Error Tracking**: Centralized error monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the coding standards in each project's README
- Write tests for new functionality
- Update documentation as needed
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [docs/](docs/) directory
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the development team

## 🙏 Acknowledgments

- **LangChain** for AI agent orchestration
- **FastAPI** for the excellent web framework
- **Next.js** for the React framework
- **Tailwind CSS** for the utility-first CSS framework
- **OpenAI** and **Anthropic** for AI services

---

**Built with ❤️ for the future of learning**