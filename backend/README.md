# MotorMob Backend API

This folder contains the backend API for the MotorMob application. The API provides endpoints to access driver data, race information, standings, and news related to motorsports.

## API Endpoints

### Drivers
- `GET /motorsport/drivers/:id` - Get driver profile by ID
- `GET /drivers` - Get all drivers

### Racing Series
- `GET /motorsport/series` - Get all racing series
- `GET /motorsport/series/:id` - Get racing series by ID
- `GET /motorsport/series/:id/races` - Get races for a specific series

### Races
- `GET /motorsport/races/upcoming` - Get upcoming races
- `GET /motorsport/race-calendar` - Get race calendar
- `GET /motorsport/races/:id` - Get race details
- `GET /motorsport/race-results/:id` - Get race results

### Standings
- `GET /motorsport/standings` - Get championship standings

### News
- `GET /motorsport/news` - Get latest news

## Mock Data

The API currently uses mock data from the `data/mockData.js` file. This will be replaced with a real database in the future.

## Setup

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. The server will start on port 3000 by default

## Development

- To start both frontend and backend servers, run the `start-servers.bat` script in the root directory.
