#!/bin/bash

# Development script to run both frontend and backend
# Usage: ./scripts/dev.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Learning Path Generator Development Environment${NC}"

# Check if required tools are installed
check_requirements() {
    echo -e "${YELLOW}Checking requirements...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed${NC}"
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}❌ Python 3 is not installed${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm is not installed${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ All requirements met${NC}"
}

# Install dependencies
install_dependencies() {
    echo -e "${YELLOW}Installing dependencies...${NC}"
    
    # Frontend dependencies
    echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
    cd frontend
    npm install
    cd ..
    
    # Backend dependencies
    echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        python3 -m venv venv
    fi
    
    # Activate virtual environment and install dependencies
    source venv/bin/activate || source venv/Scripts/activate  # Windows compatibility
    pip install -r requirements.txt
    cd ..
    
    echo -e "${GREEN}✅ Dependencies installed${NC}"
}

# Check environment files
check_env_files() {
    echo -e "${YELLOW}Checking environment files...${NC}"
    
    if [ ! -f "frontend/.env.local" ]; then
        echo -e "${YELLOW}⚠️  Creating frontend/.env.local from template${NC}"
        cp frontend/env.example frontend/.env.local
    fi
    
    if [ ! -f "backend/.env" ]; then
        echo -e "${YELLOW}⚠️  Creating backend/.env from template${NC}"
        cp backend/env.example backend/.env
    fi
    
    echo -e "${GREEN}✅ Environment files ready${NC}"
}

# Start services
start_services() {
    echo -e "${YELLOW}Starting services...${NC}"
    
    # Start backend in background
    echo -e "${YELLOW}🔧 Starting backend server...${NC}"
    cd backend
    source venv/bin/activate || source venv/Scripts/activate
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    cd ..
    
    # Wait a moment for backend to start
    sleep 3
    
    # Start frontend
    echo -e "${YELLOW}🎨 Starting frontend server...${NC}"
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    echo -e "${GREEN}✅ Services started!${NC}"
    echo -e "${GREEN}🌐 Frontend: http://localhost:3000${NC}"
    echo -e "${GREEN}🔧 Backend: http://localhost:8000${NC}"
    echo -e "${GREEN}📚 API Docs: http://localhost:8000/docs${NC}"
    
    # Wait for user to stop services
    echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
    
    # Trap Ctrl+C and cleanup
    trap cleanup SIGINT
    
    # Wait for background processes
    wait $FRONTEND_PID $BACKEND_PID
}

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}Stopping services...${NC}"
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null || true
    echo -e "${GREEN}✅ Services stopped${NC}"
    exit 0
}

# Main execution
main() {
    check_requirements
    install_dependencies
    check_env_files
    start_services
}

# Run main function
main "$@"
