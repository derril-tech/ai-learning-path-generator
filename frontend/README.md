# Learning Path Generator - Frontend

The Next.js 14 frontend application for the Learning Path Generator, featuring AI-driven learning path creation and management.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-learning-path-generator/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/       # Dashboard route group
│   ├── (plan)/           # Learning plan route group
│   ├── (catalog)/        # Content catalog route group
│   ├── (assess)/         # Assessment route group
│   ├── (coach)/          # AI coach route group
│   ├── (admin)/          # Admin panel route group
│   ├── (settings)/       # User settings route group
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── forms/            # Form components
│   ├── charts/           # Data visualization
│   └── providers/        # React context providers
├── lib/                  # Utility libraries
│   ├── api/              # API client
│   ├── utils/            # Helper functions
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   └── constants/        # Application constants
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🎨 Styling

This project uses **Tailwind CSS** for styling with a custom design system:

- **Colors**: Primary, secondary, success, warning, error variants
- **Typography**: Inter font family with responsive sizing
- **Components**: Pre-built component classes for common UI patterns
- **Dark Mode**: Built-in dark mode support (coming soon)

### Design Tokens

```css
/* Primary Colors */
--primary-50: #f0f9ff;
--primary-500: #0ea5e9;
--primary-900: #0c4a6e;

/* Secondary Colors */
--secondary-50: #f8fafc;
--secondary-500: #64748b;
--secondary-900: #0f172a;
```

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=your-auth-domain.auth0.com
NEXT_PUBLIC_AUTH_CLIENT_ID=your-auth-client-id

# Feature Flags
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_CALENDAR=true
```

### Next.js Configuration

The `next.config.js` file includes:

- App Router configuration
- Image optimization settings
- API proxy configuration
- Environment variable handling

## 📱 Features

### Core Features
- **Learning Path Creation**: AI-powered personalized learning plans
- **Content Discovery**: Search and filter learning resources
- **Progress Tracking**: Visual progress indicators and analytics
- **AI Coach**: Interactive chat assistant for learning guidance
- **Assessment Tools**: Diagnostic and formative assessments
- **Calendar Integration**: Schedule learning sessions

### UI Components
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant
- **Dark Mode**: Theme switching (coming soon)
- **Internationalization**: Multi-language support (planned)

## 🔌 API Integration

The frontend communicates with the backend via REST API and WebSocket connections:

### REST API
- Authentication and user management
- Learning plan CRUD operations
- Content search and recommendations
- Assessment submission and results
- Analytics and progress tracking

### WebSocket
- Real-time chat with AI coach
- Live progress updates
- Plan modification notifications

## 🧪 Testing

### Testing Stack
- **Jest**: Test runner
- **React Testing Library**: Component testing
- **MSW**: API mocking
- **Playwright**: E2E testing (planned)

### Running Tests
```bash
# Unit tests
npm test

# E2E tests (coming soon)
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 📦 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker
```bash
# Build image
docker build -t learning-path-frontend .

# Run container
docker run -p 3000:3000 learning-path-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

## 📚 Documentation

- [API Documentation](../docs/API_SPEC.md)
- [Component Library](../docs/COMPONENTS.md)
- [Deployment Guide](../docs/DEPLOYMENT.md)

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**API Connection Issues**
- Verify backend is running on correct port
- Check CORS configuration
- Validate environment variables

**Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS imports
- Verify design token usage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [documentation](../docs/)
- Open an issue on GitHub
- Contact the development team
