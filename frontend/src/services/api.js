import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// API services for drivers
export const driverService = {
  // Get all drivers
  getAllDrivers: async () => {
    try {
      const response = await api.get('/drivers');
      return response.data;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  },
  
  // Get driver by ID
  getDriverById: async (id) => {
    try {
      const response = await api.get(`/drivers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching driver ${id}:`, error);
      throw error;
    }
  },
  
  // Create new driver
  createDriver: async (driverData) => {
    try {
      const response = await api.post('/drivers', driverData);
      return response.data;
    } catch (error) {
      console.error('Error creating driver:', error);
      throw error;
    }
  },
  
  // Update driver
  updateDriver: async (id, driverData) => {
    try {
      const response = await api.put(`/drivers/${id}`, driverData);
      return response.data;
    } catch (error) {
      console.error(`Error updating driver ${id}:`, error);
      throw error;
    }
  },
  
  // Delete driver
  deleteDriver: async (id) => {
    try {
      const response = await api.delete(`/drivers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting driver ${id}:`, error);
      throw error;
    }
  }
};

// API services for motorsport data
export const motorsportService = {
  // Get driver profile data
  getDriverProfile: async (id) => {
    try {
      const response = await api.get(`/motorsport/drivers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching driver profile ${id}:`, error);
      throw error;
    }
  },
  
  // Get championship standings
  getStandings: async (series = 'all') => {
    try {
      const response = await api.get(`/motorsport/standings?series=${series}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching standings:', error);
      throw error;
    }
  },
  
  // Get race results
  getRaceResults: async (raceId) => {
    try {
      const response = await api.get(`/motorsport/races/${raceId}/results`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching race results for ${raceId}:`, error);
      throw error;
    }
  },
  
  // Get upcoming races
  getUpcomingRaces: async (limit = 5) => {
    try {
      const response = await api.get(`/motorsport/races/upcoming?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming races:', error);
      throw error;
    }
  },
  
  // Get race calendar
  getRaceCalendar: async (series = 'all', year = new Date().getFullYear()) => {
    try {
      const response = await api.get(`/motorsport/calendar?series=${series}&year=${year}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching race calendar:', error);
      throw error;
    }
  },
  
  // Get latest news
  getLatestNews: async (limit = 10) => {
    try {
      const response = await api.get(`/motorsport/news?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
};

// Racing series service
export const seriesService = {
  // Get all racing series
  getAllSeries: async () => {
    try {
      const response = await api.get('/motorsport/series');
      return response.data;
    } catch (error) {
      console.error('Error fetching racing series:', error);
      throw error;
    }
  },
  
  // Get series by ID
  getSeriesById: async (id) => {
    try {
      const response = await api.get(`/motorsport/series/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching series ${id}:`, error);
      throw error;
    }
  },
  
  // Get races by series ID
  getRacesBySeries: async (seriesId) => {
    try {
      const response = await api.get(`/motorsport/series/${seriesId}/races`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching races for series ${seriesId}:`, error);
      throw error;
    }
  }
};

// Race results service
export const raceService = {
  // Get race results by race ID
  getRaceResults: async (raceId) => {
    try {
      const response = await api.get(`/motorsport/race-results/${raceId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching results for race ${raceId}:`, error);
      throw error;
    }
  },
  
  // Get race calendar
  getRaceCalendar: async () => {
    try {
      const response = await api.get('/motorsport/race-calendar');
      return response.data;
    } catch (error) {
      console.error('Error fetching race calendar:', error);
      throw error;
    }
  }
};

// Export the default axios instance
export default api;
