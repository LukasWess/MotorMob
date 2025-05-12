// F1 Motorsport Data API service
const axios = require('axios');
require('dotenv').config();

// RapidAPI configuration
const rapidApiKey = process.env.RAPID_API_KEY;
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

// F1 API methods
const f1ApiService = {
  // Get current F1 season schedule
  getSchedule: async () => {
    try {
      const response = await f1Api.get('/races');
      return response.data;
    } catch (error) {
      console.error('Error fetching F1 schedule:', error);
      throw error;
    }
  },
  
  // Get F1 driver standings
  getDriverStandings: async () => {
    try {
      const response = await f1Api.get('/standings/drivers');
      return response.data;
    } catch (error) {
      console.error('Error fetching F1 driver standings:', error);
      throw error;
    }
  },
  
  // Get F1 constructor standings
  getConstructorStandings: async () => {
    try {
      const response = await f1Api.get('/standings/constructors');
      return response.data;
    } catch (error) {
      console.error('Error fetching F1 constructor standings:', error);
      throw error;
    }
  },
  
  // Get specific race results
  getRaceResults: async (raceId) => {
    try {
      const response = await f1Api.get(`/races/${raceId}/results`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching F1 race results for ${raceId}:`, error);
      throw error;
    }
  },
  
  // Get driver information
  getDriverInfo: async (driverId) => {
    try {
      const response = await f1Api.get(`/drivers/${driverId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching F1 driver info for ${driverId}:`, error);
      throw error;
    }
  },
  
  // Get constructor information
  getConstructorInfo: async (constructorId) => {
    try {
      const response = await f1Api.get(`/constructors/${constructorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching F1 constructor info for ${constructorId}:`, error);
      throw error;
    }
  },
  
  // Get qualifying results
  getQualifyingResults: async (raceId) => {
    try {
      const response = await f1Api.get(`/races/${raceId}/qualifying`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching F1 qualifying results for ${raceId}:`, error);
      throw error;
    }
  },
  
  // Get circuit information
  getCircuitInfo: async (circuitId) => {
    try {
      const response = await f1Api.get(`/circuits/${circuitId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching F1 circuit info for ${circuitId}:`, error);
      throw error;
    }
  }
};

module.exports = f1ApiService;
