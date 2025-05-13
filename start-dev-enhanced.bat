@echo off
echo Starting MotorMob development environment...

echo Checking for MySQL service...
sc query MySQL80 | findstr "RUNNING"
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: MySQL service doesn't appear to be running. 
    echo Do you want to continue anyway? (Y/N)
    set /p confirm=
    if /i "%confirm%" NEQ "Y" exit /b
)

echo Starting backend server...
start cmd /k "cd c:\Users\skrov\Desktop\MotorMob\backend && echo Starting backend server... && npm run dev"

:: Wait for backend to initialize with a progress indicator
echo Waiting for backend to initialize...
for /l %%x in (1, 1, 10) do (
    echo|set /p=".."
    timeout /t 1 /nobreak > nul
)
echo.

:: Check if backend is running
curl -s http://localhost:3000 > nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Backend server did not start properly.
    echo Do you want to continue with frontend startup? (Y/N)
    set /p confirm=
    if /i "%confirm%" NEQ "Y" exit /b
) else (
    echo Backend server started successfully at http://localhost:3000
)

echo Starting frontend server...
start cmd /k "cd c:\Users\skrov\Desktop\MotorMob\frontend && echo Starting frontend server... && npm start"

echo.
echo MotorMob development environment started.
echo - Backend: http://localhost:3000
echo - Frontend: http://localhost:4000
echo.
echo If you encounter any issues:
echo 1. Try running the diagnose.bat script
echo 2. Check if MySQL is running
echo 3. Verify the .env configuration
