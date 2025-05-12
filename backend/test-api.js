const axios = require('axios');
require('dotenv').config();

async function testBackendApi() {
  try {
    // Test the root endpoint
    console.log('Testing root endpoint...');
    const rootResponse = await axios.get('http://localhost:3000');
    console.log('Root endpoint response:', rootResponse.data);
    
    // Test creating a driver
    console.log('\nTesting driver creation...');
    const testDriver = {
      name: 'Test Driver',
      licenseNumber: 'TEST12345',
      phoneNumber: '555-1234',
      email: 'test@example.com',
      status: 'active'
    };
    
    const createResponse = await axios.post('http://localhost:3000/drivers', testDriver);
    console.log('Driver created:', createResponse.data);
    
    // Test getting all drivers
    console.log('\nTesting get all drivers...');
    const driversResponse = await axios.get('http://localhost:3000/drivers');
    console.log('All drivers:', driversResponse.data);
    
    // Test motorsport endpoints
    console.log('\nTesting motorsport endpoints...');
    const upcomingRacesResponse = await axios.get('http://localhost:3000/motorsport/races/upcoming');
    console.log('Upcoming races:', upcomingRacesResponse.data);
    
    console.log('\n✅ All tests passed! Your backend API is working correctly!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

async function testF1Api() {
  try {
    console.log('\n----- Testing F1 API Service -----');
    // Dynamically import the F1 API service
    const f1ApiService = require('./services/f1Api');
    
    // Check if API key is set
    if (!process.env.RAPID_API_KEY) {
      console.error('❌ RAPID_API_KEY is not set in .env file');
      console.log('Please set your RapidAPI key in the .env file');
      return;
    }
    
    console.log('Testing F1 API connection with key:', process.env.RAPID_API_KEY.substring(0, 5) + '...');
    
    // Test schedule
    console.log('\nTesting getSchedule:');
    try {
      const schedule = await f1ApiService.getSchedule();
      console.log(`Retrieved ${schedule ? schedule.length : 0} races`);
      if (schedule && schedule.length > 0) {
        console.log('First race:', {
          name: schedule[0].name,
          date: schedule[0].date,
          circuit: schedule[0].circuit_name
        });
      } else {
        console.log('No schedule data returned');
      }
    } catch (error) {
      console.error('Schedule test failed:', error.message);
    }
    
    // Test driver standings
    console.log('\nTesting getDriverStandings:');
    try {
      const driverStandings = await f1ApiService.getDriverStandings();
      console.log(`Retrieved ${driverStandings ? driverStandings.length : 0} driver standings`);
      if (driverStandings && driverStandings.length > 0) {
        console.log('Top driver:', {
          position: driverStandings[0].position,
          name: driverStandings[0].driver_name,
          points: driverStandings[0].points
        });
      } else {
        console.log('No driver standings data returned');
      }
    } catch (error) {
      console.error('Driver standings test failed:', error.message);
    }
    
    console.log('\nF1 API test completed');
  } catch (error) {
    console.error('F1 API test failed:', error.message);
  }
}

// Run the tests
const testType = process.argv[2];
if (testType === 'f1api') {
  testF1Api();
} else {
  testBackendApi();
}
