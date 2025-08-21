@echo off
REM Development script to run both frontend and backend on Windows
REM Usage: scripts\dev.bat

echo 🚀 Starting Learning Path Generator Development Environment

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed
    exit /b 1
)

echo ✅ Requirements check passed

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    python -m venv venv
)

REM Activate virtual environment and install dependencies
call venv\Scripts\activate.bat
pip install -r requirements.txt
cd ..

REM Check environment files
echo 🔧 Checking environment files...
if not exist "frontend\.env.local" (
    echo ⚠️  Creating frontend\.env.local from template
    copy frontend\env.example frontend\.env.local
)

if not exist "backend\.env" (
    echo ⚠️  Creating backend\.env from template
    copy backend\env.example backend\.env
)

echo ✅ Environment setup complete

REM Start backend
echo 🔧 Starting backend server...
cd backend
call venv\Scripts\activate.bat
start "Backend Server" cmd /k "uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
cd ..

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting frontend server...
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo ✅ Services started!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Press any key to continue...
pause >nul
