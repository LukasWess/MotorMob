const axios = require('axios');

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
    
    console.log('\n✅ All tests passed! Your backend API is working correctly!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testBackendApi();
