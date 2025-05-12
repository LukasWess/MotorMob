# MotorMob Frontend

This is the frontend application for MotorMob, a vehicle and driver management platform.

## Features

- Driver management
- Responsive design
- Modern React architecture

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd MotorMob/frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

The application will be available at http://localhost:3000.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
frontend/
├── public/            # Public assets and index.html
├── src/               # Source code
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── styles/        # CSS files
│   ├── App.js         # Main App component
│   └── index.js       # Entry point
└── package.json       # Project dependencies and scripts
```

## Backend Communication

The frontend communicates with the backend API running on port 4000. The API URL can be configured in the `.env` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
