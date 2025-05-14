// Motorsport API routes
const express = require('express');
const router = express.Router();
const { images } = require('../data/images');
const f1ApiService = require('../services/f1Api');

// Import mock data
const { 
  mockDrivers, 
  mockRaces, 
  mockUpcomingRaces, 
  mockStandings,
  mockNews,
  mockRacingSeries,
  mockRacesBySeries,
  mockRaceCalendar,
  mockRaceResults
} = require('../data/mockData');

// GET driver profile
router.get('/drivers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Handle F1 drivers via F1 API
    if (id.startsWith('f1-')) {
      const driverId = id.replace('f1-', '');
      try {
        const driverData = await f1ApiService.getDriverInfo(driverId);
        // Transform the data to match our application format
        const transformedData = {
          id: `f1-${driverData.id}`,
          name: `${driverData.firstname} ${driverData.lastname}`,
          number: driverData.number,
          team: driverData.team?.name || 'Unknown Team',
          nationality: driverData.nationality,
          dateOfBirth: driverData.dateOfBirth,
          biography: driverData.biography || `${driverData.firstname} ${driverData.lastname} is a Formula 1 driver currently competing for ${driverData.team?.name || 'Unknown Team'}.`,
          championships: driverData.championships || 0,
          wins: driverData.wins || 0,
          podiums: driverData.podiums || 0,
          polePositions: driverData.pole_positions || 0,
          fastestLaps: driverData.fastest_laps || 0,
          currentSeasonPoints: driverData.points || 0,
          currentSeasonPosition: driverData.position || 0,
          image: driverData.image || images.drivers.placeholder
        };
        return res.json(transformedData);
      } catch (apiError) {
        console.error('F1 API error:', apiError);
        // Fall back to mock data if F1 API fails
      }
    }
    
    // Return mock data for non-F1 drivers or if F1 API fails
    const driver = mockDrivers[id];
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    console.error('Error fetching driver profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET championship standings
router.get('/standings', async (req, res) => {
  try {
    const { series = 'all' } = req.query;
    
    // If specifically requesting F1 standings, use F1 API
    if (series === 'f1') {
      try {
        const standingsData = await f1ApiService.getDriverStandings();
        // Transform the data to match our application format
        const transformedData = standingsData.map((driver, index) => ({
          position: driver.position || index + 1,
          driver: {
            id: `f1-${driver.driver_id}`,
            name: driver.driver_name,
            nationality: driver.nationality
          },
          team: driver.team_name,
          points: driver.points,
          wins: driver.wins || 0,
          series: 'Formula 1'
        }));
        return res.json(transformedData);
      } catch (apiError) {
        console.error('F1 API error:', apiError);
        // Fall back to mock data if F1 API fails
      }
    }
    
    // Return mock data for other series or combined standings
    let standings = [];
    
    if (series === 'all') {
      // Combine standings from all series
      Object.values(mockStandings).forEach(seriesStandings => {
        standings = [...standings, ...seriesStandings];
      });
    } else {
      // Return standings for specific series
      standings = mockStandings[series] || [];
    }
    
    res.json(standings);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET race results
router.get('/races/:id/results', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Handle F1 race results via F1 API
    if (id.startsWith('f1-')) {
      const raceId = id.replace('f1-', '');
      try {
        const resultsData = await f1ApiService.getRaceResults(raceId);
        // Transform the data to match our application format
        const transformedData = {
          id: `f1-${raceId}`,
          name: resultsData.race_name,
          date: resultsData.date,
          circuit: resultsData.circuit_name,
          results: resultsData.results.map((result, index) => ({
            position: result.position,
            driver: {
              id: `f1-${result.driver_id}`,
              name: result.driver_name,
              nationality: result.nationality
            },
            team: result.team_name,
            time: result.time,
            status: result.status,
            points: result.points,
            fastestLap: result.fastest_lap === "1"
          }))
        };
        return res.json(transformedData);
      } catch (apiError) {
        console.error('F1 API error:', apiError);
        // Fall back to mock data if F1 API fails
      }
    }
    
    // Return mock data for non-F1 races or if F1 API fails
    const race = mockRaces[id];
    if (!race) {
      return res.status(404).json({ message: 'Race not found' });
    }
    
    // Check if race has results
    if (race.status !== 'completed' || !race.result) {
      return res.status(404).json({ message: 'Results not available for this race' });
    }
    
    res.json({
      id: race.id,
      name: race.name,
      date: race.date,
      circuit: race.circuit,
      results: race.results || []
    });
  } catch (error) {
    console.error('Error fetching race results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET upcoming races
router.get('/races/upcoming', async (req, res) => {
  try {
    const { limit } = req.query;
    
    // Try to get F1 schedule from F1 API
    let f1UpcomingRaces = [];
    try {
      const scheduleData = await f1ApiService.getSchedule();
      // Filter for upcoming races
      const currentDate = new Date();
      f1UpcomingRaces = scheduleData
        .filter(race => new Date(race.date) > currentDate)
        .map(race => ({
          id: `f1-${race.id}`,
          name: race.name,
          circuit: race.circuit_name,
          date: race.date,
          time: race.time || '14:00',
          location: `${race.location}, ${race.country}`,
          status: 'upcoming',
          series: 'Formula 1',
          thumbnail: race.circuit_image || images.circuits.placeholder
        }));
    } catch (apiError) {
      console.error('F1 API error:', apiError);
      // Continue with mock data if F1 API fails
    }
    
    // Combine F1 data with other series data
    let upcomingRaces = [...f1UpcomingRaces, ...mockUpcomingRaces];
    
    // Sort by date
    upcomingRaces.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Apply limit if specified
    if (limit) {
      upcomingRaces = upcomingRaces.slice(0, parseInt(limit, 10));
    }
    
    res.json(upcomingRaces);
  } catch (error) {
    console.error('Error fetching upcoming races:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET race calendar
router.get('/calendar', async (req, res) => {
  try {
    const { series = 'all', year = new Date().getFullYear() } = req.query;
    
    // If specifically requesting F1 calendar, use F1 API
    let f1Calendar = [];
    if (series === 'all' || series === 'f1') {
      try {
        const scheduleData = await f1ApiService.getSchedule();
        f1Calendar = scheduleData.map(race => ({
          id: `f1-${race.id}`,
          name: race.name,
          circuit: race.circuit_name,
          date: race.date,
          time: race.time || '14:00',
          location: `${race.location}, ${race.country}`,
          status: new Date(race.date) < new Date() ? 'completed' : 'upcoming',
          series: 'Formula 1',
          thumbnail: race.circuit_image || images.circuits.placeholder
        }));
      } catch (apiError) {
        console.error('F1 API error:', apiError);
        // Continue with mock data if F1 API fails
      }
    }
    
    // For other series, use mock data
    let calendar = [];
    
    if (series === 'all') {
      // Combine all races from all series
      calendar = [...f1Calendar, ...Object.values(mockRaces)];
    } else if (series === 'f1') {
      calendar = f1Calendar;
    } else {
      // Filter mock races by series
      calendar = Object.values(mockRaces).filter(race => race.series.toLowerCase() === series.toLowerCase());
    }
    
    // Sort by date
    calendar.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    res.json(calendar);
  } catch (error) {
    console.error('Error fetching race calendar:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET latest news
router.get('/news', async (req, res) => {
  try {
    const { limit = 10, category = 'all' } = req.query;
    
    // Filter news by category if specified
    let news = mockNews;
    if (category !== 'all') {
      news = news.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
    
    // Sort by date (newest first)
    news.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Apply limit
    news = news.slice(0, parseInt(limit, 10));
    
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET race details
router.get('/races/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Handle F1 race details via F1 API
    if (id.startsWith('f1-')) {
      const raceId = id.replace('f1-', '');
      try {
        const [raceData, circuitData] = await Promise.all([
          f1ApiService.getSchedule().then(schedule => 
            schedule.find(race => race.id === raceId)
          ),
          f1ApiService.getCircuitInfo(raceId)
        ]);
        
        if (!raceData) {
          return res.status(404).json({ message: 'Race not found' });
        }
        
        // Transform the data to match our application format
        const transformedData = {
          id: `f1-${raceId}`,
          name: raceData.name,
          circuit: raceData.circuit_name,
          location: `${raceData.location}, ${raceData.country}`,
          date: raceData.date,
          time: raceData.time || '14:00',
          status: new Date(raceData.date) < new Date() ? 'completed' : 'upcoming',
          series: 'Formula 1',
          circuitLength: circuitData?.length || 'Unknown',
          laps: circuitData?.laps || 'Unknown',
          distance: circuitData?.distance || 'Unknown',
          lapRecord: circuitData?.lap_record || {
            time: 'Unknown',
            driver: 'Unknown',
            year: 'Unknown'
          },
          circuitImage: raceData.circuit_image || images.circuits.placeholder,
          description: circuitData?.description || `The ${raceData.name} is held at ${raceData.circuit_name} in ${raceData.location}, ${raceData.country}.`,
          previousWinners: circuitData?.previous_winners || [],
          trackLayout: raceData.circuit_image || images.circuits.placeholder,
          weatherForecast: {
            conditions: 'Unknown',
            temperature: 'Unknown',
            precipitation: 'Unknown',
            windSpeed: 'Unknown'
          }
        };
        return res.json(transformedData);
      } catch (apiError) {
        console.error('F1 API error:', apiError);
        // Fall back to mock data if F1 API fails
      }
    }
    
    // Return mock data for non-F1 races or if F1 API fails
    const race = mockRaces[id];
    if (!race) {
      return res.status(404).json({ message: 'Race not found' });
    }
    
    res.json(race);
  } catch (error) {
    console.error('Error fetching race details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET racing series
router.get('/series', (req, res) => {
  try {
    res.json(mockRacingSeries);
  } catch (error) {
    console.error('Error fetching racing series:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET racing series by ID
router.get('/series/:id', (req, res) => {
  try {
    const { id } = req.params;
    const series = mockRacingSeries.find(s => s.id === parseInt(id));
    if (!series) {
      return res.status(404).json({ message: 'Racing series not found' });
    }
    res.json(series);
  } catch (error) {
    console.error('Error fetching racing series:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET races by series
router.get('/series/:id/races', (req, res) => {
  try {
    const { id } = req.params;
    const races = mockRacesBySeries[id] || [];
    res.json(races);
  } catch (error) {
    console.error('Error fetching races by series:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET race calendar
router.get('/race-calendar', (req, res) => {
  try {
    res.json(mockRaceCalendar);
  } catch (error) {
    console.error('Error fetching race calendar:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET race results
router.get('/race-results/:id', (req, res) => {
  try {
    const { id } = req.params;
    const results = mockRaceResults[id];
    if (!results) {
      return res.status(404).json({ message: 'Race results not found' });
    }
    res.json(results);
  } catch (error) {
    console.error('Error fetching race results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
