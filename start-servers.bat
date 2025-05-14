@echo off
echo Starting MotorMob Development Environment...

REM Start backend server
echo Starting backend server...
start cmd /k "cd backend && npm start"

REM Wait 5 seconds to ensure backend is up
timeout /t 5 /nobreak > nul

REM Start frontend server
echo Starting frontend server...
start cmd /k "cd frontend && npm start"

echo MotorMob Development Environment started successfully!
echo - Backend: http://localhost:3000
echo - Frontend: http://localhost:3001
echo Use Ctrl+C in the respective terminal windows to stop the servers.
