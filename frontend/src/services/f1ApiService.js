// F1 API service for the frontend
import axios from 'axios';

// Create axios instance for F1 API (via our backend)
const f1ApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// F1 API frontend service
const f1ApiService = {
  // Get current F1 season schedule
  getSchedule: async () => {
    try {
      const response = await f1ApiClient.get('/motorsport/f1/schedule');
      return response.data;
    } catch (error) {
      console.error('Error fetching F1 schedule:', error);
      throw error;
    }
  },
  
  // Get F1 driver standings
  getDriverStandings: async () => {
    try {
      const response = await f1ApiClient.get('/motorsport/f1/standings/drivers');
      return response.data;
    } catch (error) {
      console.error('Error fetching F1 driver standings:', error);
      throw error;
    }
  },
  
  // Get F1 constructor standings
  getConstructorStandings: async () => {
    try {
      const response = await f1ApiClient.get('/motorsport/f1/standings/constructors');
      return response.data;
    } catch (error) {
      console.error('Error fetching F1 constructor standings:', error);
      throw error;
    }
  },
  
  // Get specific race results
  getRaceResults: async (raceId) => {
    try {
      const response = await f1ApiClient.get(`/motorsport/f1/races/${raceId}/results`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching F1 race results for ${raceId}:`, error);
      throw error;
    }
  },
  
  // Get driver information
  getDriverInfo: async (driverId) => {
    try {
      const response = await f1ApiClient.get(`/motorsport/f1/drivers/${driverId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching F1 driver info for ${driverId}:`, error);
      throw error;
    }
  }
};

export default f1ApiService;
