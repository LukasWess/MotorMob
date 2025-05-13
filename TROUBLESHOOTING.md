# MotorMob Troubleshooting Guide

## Common Startup Issues

### Backend Won't Start

1. **Database Connection Issues**
   - Ensure MySQL is installed and running
   - Verify database credentials in `backend/.env`
   - Try connecting to MySQL manually: `mysql -u root -p`
   - Run `npm install mysql2` if the package is missing

2. **Port Conflicts**
   - Ensure no other application is using port 3000
   - To check: `netstat -ano | findstr :3000`
   - To kill process: `taskkill /PID [PID] /F`

3. **Missing Dependencies**
   - Run `npm install` in the backend directory
   - Check for errors in npm logs

### Frontend Won't Start

1. **Port Conflicts**
   - Ensure no other application is using port 4000
   - To check: `netstat -ano | findstr :4000`
   - To kill process: `taskkill /PID [PID] /F`

2. **API Connection Issues**
   - Verify the proxy setting in `frontend/package.json`
   - Ensure it points to `http://localhost:3000`

3. **Missing Dependencies**
   - Run `npm install` in the frontend directory
   - Check for errors in npm logs

### Other Common Issues

1. **Node.js Version**
   - Ensure you're using Node.js v16+ (`node -v`)
   - If needed, install nvm for Windows to manage Node versions

2. **Environment Variables**
   - Verify all required environment variables in `.env`
   - Required variables:
     - PORT=3000
     - DB_HOST=localhost
     - DB_USER=root
     - DB_PASSWORD=[your-password]
     - DB_NAME=MotorMob

## Running the Diagnostic Tool

Run `diagnose.bat` from the project root to perform automated diagnostics.

## Manual Testing

1. Test backend API: `curl http://localhost:3000`
2. Test connection to frontend: Open browser to `http://localhost:4000`

## Need More Help?

- Check the error logs in the terminal windows
- Try restarting your computer
- Reinstall Node.js and npm if necessary
