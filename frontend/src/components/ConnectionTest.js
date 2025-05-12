import React, { useState } from 'react';
import { driverService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

function ConnectionTest() {
  const [testStatus, setTestStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const testConnection = async () => {
    setLoading(true);
    try {
      const testDriver = {
        name: 'Test Driver',
        licenseNumber: 'TEST12345',
        phoneNumber: '555-1234',
        email: 'test@example.com',
        status: 'active'
      };
      
      // Create a test driver
      const createdDriver = await driverService.createDriver(testDriver);
      
      // Fetch drivers to confirm
      const allDrivers = await driverService.getAllDrivers();
      
      setTestStatus({
        success: true,
        message: `Connection successful! Created test driver and found ${allDrivers.length} drivers in the database.`
      });
    } catch (error) {
      console.error('API test failed:', error);
      setTestStatus({
        success: false,
        message: `Connection failed: ${error.message}`,
        error: error
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="connection-test">
      <h3>Backend Connection Test</h3>
      <button 
        className="btn btn-primary" 
        onClick={testConnection}
        disabled={loading}
      >
        Test Backend Connection
      </button>
      
      {loading && <LoadingSpinner message="Testing connection..." />}
      
      {testStatus && (
        <div className={`alert ${testStatus.success ? 'alert-success' : 'alert-error'}`}>
          <strong>{testStatus.success ? 'Success!' : 'Error:'}</strong> {testStatus.message}
        </div>
      )}
    </div>
  );
}

export default ConnectionTest;
