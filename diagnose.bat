@echo off
echo =======================================
echo MotorMob Diagnostic Tool
echo =======================================

echo Checking Node.js installation...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    exit /b
)

echo Checking npm installation...
npm --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed or not in PATH
    exit /b
)

echo.
echo Checking database configuration...
echo MySQL password from .env: 
findstr "DB_PASSWORD" c:\Users\skrov\Desktop\MotorMob\backend\.env

echo.
echo Testing backend dependencies...
cd c:\Users\skrov\Desktop\MotorMob\backend
call npm list express sequelize mysql2 cors dotenv

echo.
echo Testing backend connectivity...
call node -e "const mysql = require('mysql2'); const connection = mysql.createConnection({host: 'localhost', user: 'root', password: process.env.DB_PASSWORD || 'LiebdgfBBB1234', database: 'MotorMob'}); connection.connect(err => { if(err) { console.error('Database connection failed: ' + err.stack); return; } console.log('Successfully connected to the database.'); connection.end(); });"

echo.
echo Testing backend server...
start cmd /k "cd c:\Users\skrov\Desktop\MotorMob\backend && npm run dev"
timeout /t 10 /nobreak > nul
curl http://localhost:3000
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Backend server is not responding
) else (
    echo Backend server is running correctly
)

echo.
echo Testing frontend dependencies...
cd c:\Users\skrov\Desktop\MotorMob\frontend
call npm list react react-dom axios react-router-dom

echo.
echo =======================================
echo Diagnostic complete
echo =======================================
