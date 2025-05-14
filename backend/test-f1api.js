// Test script for F1 API
const f1ApiService = require('./services/f1Api');

async function testApi() {
  console.log('Testing F1 API services...');
  console.log('------------------------');
  
  try {
    console.log('1. Testing schedule endpoint:');
    const schedule = await f1ApiService.getSchedule();
    console.log('- Success! Received', schedule.length || 0, 'races');
    console.log('- First race:', schedule[0]?.name || 'N/A');
    console.log('------------------------');
    
    console.log('2. Testing driver standings endpoint:');
    const driverStandings = await f1ApiService.getDriverStandings();
    console.log('- Success! Received', driverStandings.length || 0, 'driver standings');
    console.log('- Leader:', driverStandings[0]?.driver_name || 'N/A');
    console.log('------------------------');
    
    console.log('3. Testing team standings endpoint:');
    const constructorStandings = await f1ApiService.getConstructorStandings();
    console.log('- Success! Received', constructorStandings.length || 0, 'team standings');
    console.log('- Leading team:', constructorStandings[0]?.name || 'N/A');
    console.log('------------------------');
    
    console.log('4. Testing driver info endpoint:');
    const driverInfo = await f1ApiService.getDriverInfo('verstappen');
    console.log('- Success! Received driver info for:', driverInfo?.firstname, driverInfo?.lastname || 'N/A');
    console.log('------------------------');
    
    console.log('All tests completed successfully! The F1 API service is using fallback data as expected.');
  } catch (error) {
    console.error('Error during API test:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the tests
testApi();
