// F1 Motorsport Data API service
const axios = require('axios');
require('dotenv').config();

// RapidAPI configuration
const rapidApiKey = process.env.RAPID_API_KEY || '882c1576afmsh66e721c05760db8p144f16jsn53668f8054ff';
const rapidApiHost = 'f1-motorsport-data.p.rapidapi.com';

// Create axios instance for F1 API
const f1Api = axios.create({
  baseURL: 'https://f1-motorsport-data.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': rapidApiHost,
    'Content-Type': 'application/json'
  }
});

// Define a mock data fallback for when the API fails
const mockFallbacks = {
  schedule: [
    {
      id: 1,
      name: "Bahrain Grand Prix",
      circuit: "Bahrain International Circuit",
      date: "March 2, 2025",
      location: "Sakhir, Bahrain"
    },
    {
      id: 2,
      name: "Saudi Arabian Grand Prix",
      circuit: "Jeddah Corniche Circuit",
      date: "March 16, 2025",
      location: "Jeddah, Saudi Arabia"
    },
    {
      id: 3,
      name: "Australian Grand Prix",
      circuit: "Albert Park Circuit",
      date: "March 30, 2025",
      location: "Melbourne, Australia"
    },
    {
      id: 4,
      name: "Monaco Grand Prix",
      circuit: "Circuit de Monaco",
      date: "May 25, 2025",
      location: "Monte Carlo, Monaco"
    }
  ],
  driverStandings: [
    {
      position: 1,
      driver_id: "verstappen",
      driver_name: "Max Verstappen",
      team_name: "Red Bull Racing",
      nationality: "Netherlands",
      points: 125,
      wins: 4
    },
    {
      position: 2,
      driver_id: "hamilton",
      driver_name: "Lewis Hamilton",
      team_name: "Mercedes",
      nationality: "United Kingdom",
      points: 110,
      wins: 2
    },
    {
      position: 3,
      driver_id: "leclerc",
      driver_name: "Charles Leclerc",
      team_name: "Ferrari",
      nationality: "Monaco",
      points: 98,
      wins: 1
    }
  ],
  constructorStandings: [
    {
      position: 1,
      constructor_id: "red_bull",
      name: "Red Bull Racing",
      nationality: "Austrian",
      points: 230
    },
    {
      position: 2,
      constructor_id: "mercedes",
      name: "Mercedes",
      nationality: "German",
      points: 190
    }
  ],
  driverInfo: {
    id: "verstappen",
    firstname: "Max",
    lastname: "Verstappen",
    number: 1,
    team: {
      id: "red_bull",
      name: "Red Bull Racing"
    },
    nationality: "Netherlands",
    dateOfBirth: "1997-09-30",
    biography: "Max Emilian Verstappen is a Belgian-Dutch racing driver currently competing in Formula One, under the Dutch flag, with Red Bull Racing.",
    championships: 3,
    wins: 54,
    podiums: 105,
    pole_positions: 42,
    fastest_laps: 32,
    points: 125,
    position: 1
  }
};

// Helper function to handle API errors with fallback data
const handleApiCall = async (apiCall, fallbackData, errorMessage) => {
  try {
    const response = await apiCall();
    // Check if the response has an error message from RapidAPI
    if (response.data && response.data.message && response.data.message.includes("does not exist")) {
      console.warn(`API endpoint not found, using fallback data. Details: ${response.data.message}`);
      return fallbackData;
    }
    return response.data;
  } catch (error) {
    console.error(errorMessage, error.message);
    // Return the fallback data when API call fails
    console.info("Using fallback data due to API error");
    return fallbackData;
  }
};

// F1 API methods
const f1ApiService = {
  // Get current F1 season schedule
  getSchedule: async () => {
    return handleApiCall(
      () => f1Api.get('/schedule'),
      mockFallbacks.schedule,
      'Error fetching F1 schedule:'
    );
  },
  
  // Get F1 driver standings
  getDriverStandings: async () => {
    return handleApiCall(
      () => f1Api.get('/rankings/drivers'),
      mockFallbacks.driverStandings,
      'Error fetching F1 driver standings:'
    );
  },
  
  // Get F1 constructor standings
  getConstructorStandings: async () => {
    return handleApiCall(
      () => f1Api.get('/rankings/teams'),
      mockFallbacks.constructorStandings,
      'Error fetching F1 constructor standings:'
    );
  },
  
  // Get specific race results
  getRaceResults: async (raceId) => {
    return handleApiCall(
      () => f1Api.get(`/race/${raceId}/results`),
      [],
      `Error fetching F1 race results for ${raceId}:`
    );
  },
  
  // Get driver information
  getDriverInfo: async (driverId) => {
    return handleApiCall(
      () => f1Api.get(`/driver/${driverId}`),
      mockFallbacks.driverInfo,
      `Error fetching F1 driver info for ${driverId}:`
    );
  },
  
  // Get constructor information
  getConstructorInfo: async (constructorId) => {
    return handleApiCall(
      () => f1Api.get(`/team/${constructorId}`),
      {},
      `Error fetching F1 constructor info for ${constructorId}:`
    );
  },
  
  // Get qualifying results
  getQualifyingResults: async (raceId) => {
    return handleApiCall(
      () => f1Api.get(`/race/${raceId}/qualifying`),
      [],
      `Error fetching F1 qualifying results for ${raceId}:`
    );
  },
  
  // Get circuit information
  getCircuitInfo: async (circuitId) => {
    return handleApiCall(
      () => f1Api.get(`/circuit/${circuitId}`),
      {},
      `Error fetching F1 circuit info for ${circuitId}:`
    );
  }
};

module.exports = f1ApiService;
