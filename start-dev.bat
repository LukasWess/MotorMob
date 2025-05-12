@echo off
echo Starting MotorMob development environment...

:: Start the backend server in a new terminal window
start cmd /k "cd c:\Users\skrov\Desktop\MotorMob\backend && npm run dev"

:: Wait for backend to initialize
timeout /t 3 /nobreak > nul

:: Start the frontend server in a new terminal window
start cmd /k "cd c:\Users\skrov\Desktop\MotorMob\frontend && npm start"

echo MotorMob development environment started.
echo - Backend: http://localhost:3000
echo - Frontend: http://localhost:4000
