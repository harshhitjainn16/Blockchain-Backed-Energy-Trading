@echo off
echo ========================================
echo Blockchain Energy Trading Platform
echo ========================================
echo.
echo Starting servers...
echo.
echo Backend API: http://localhost:5000
echo Frontend UI: http://localhost:3000
echo.
echo Press Ctrl+C to stop all servers
echo ========================================
echo.

start "Backend API Server" cmd /k "cd /d %~dp0 && npm run api:dev"
timeout /t 3 /nobreak >nul
start "Frontend Dev Server" cmd /k "cd /d %~dp0 && cd frontend && npm run dev"

echo.
echo ✅ Both servers are starting in separate windows
echo.
echo Backend: http://localhost:5000/api/health
echo Frontend: http://localhost:3000
echo.
pause
