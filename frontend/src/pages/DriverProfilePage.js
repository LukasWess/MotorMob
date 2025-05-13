import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { motorsportService } from '../services/api.js';
import { images } from '../assets/images';
// Import mockDrivers directly - we'll use other methods to ensure refreshing
import { mockDrivers } from '../data/mockData';
import '../styles/DriverProfilePage.css';

function DriverProfilePage() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simple function to refresh data
  const refreshData = () => {
    setLoading(true);
    fetchDriverProfile();
  };
  
  // Function to fetch driver data (either from API or mockData)
  const fetchDriverProfile = async () => {
    try {
      // Try API first
      try {
        const data = await motorsportService.getDriverProfile(id);
        setDriver(data);
        setLoading(false);
        return;
      } catch (apiError) {
        console.log('API not available, using mock data', apiError);
      }
      
      // Fall back to mock data if API fails
      // This will always use the latest imported mockDrivers from the module
      const driverFound = mockDrivers.find(driver => driver.id.toString() === id);
      
      if (driverFound) {
        console.log('Using mock data for driver:', driverFound.name);
        setDriver({ ...driverFound }); // Clone to ensure we have a fresh object
        setLoading(false);
      } else {
        setError("Driver not found");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading driver profile:', error);
      setError("Failed to load driver profile");
      setLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchDriverProfile();
  }, [id]); // Only re-run when ID changes

  if (loading) {
    return <div className="driver-profile-page loading-container"><LoadingSpinner /></div>;
  }

  if (error) {
    return (
      <div className="driver-profile-page error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/drivers" className="btn btn-primary">Back to Drivers</Link>
      </div>
    );
  }
  return (
    <div className="driver-profile-page">
      <div className="profile-header">
        {/* Moved the back-button-container outside of profile-header-content */}
        <div className="back-button-container">
          <Link to="/drivers" className="back-button">
            <i className="fas fa-arrow-left"></i> Back to Drivers
          </Link>
          <button 
            onClick={refreshData} 
            className="refresh-button"
            title="Reload driver data"
          >
            <i className="fas fa-sync"></i> Refresh Data
          </button>
        </div>
        <div className="profile-header-content">
          <div className="driver-image-container">
            <div className="driver-number">{driver.number}</div>            <div 
              className="driver-image" 
              style={{ backgroundImage: `url(${driver.image || images.drivers.placeholder})` }}
            ></div>
            <div className="driver-nationality">{driver.nationality}</div>
          </div>
          <div className="driver-basic-info">
            <h1 className="driver-name">{driver.name}</h1>
            <div className="driver-team">{driver.team}</div>
            <div className="driver-current-stats">
              <div className="current-stat">
                <span className="stat-value">{driver.currentSeasonPosition}</span>
                <span className="stat-label">Position</span>
              </div>
              <div className="current-stat">
                <span className="stat-value">{driver.currentSeasonPoints}</span>
                <span className="stat-label">Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{driver.championships}</div>
            <div className="stat-label">Championships</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{driver.wins}</div>
            <div className="stat-label">Race Wins</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{driver.podiums}</div>
            <div className="stat-label">Podiums</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{driver.polePositions}</div>
            <div className="stat-label">Pole Positions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{driver.fastestLaps}</div>
            <div className="stat-label">Fastest Laps</div>
          </div>
        </div>

        <div className="driver-details">
          <div className="biography-section">
            <h2>Biography</h2>
            <p>{driver.biography}</p>
          </div>
          
          <div className="personal-info-section">
            <h2>Personal Information</h2>
            <div className="info-grid">              <div className="info-item">
                <div className="info-label">Date of Birth</div>
                <div className="info-value" style={{ color: '#ffffff' }}>{driver.dateOfBirth}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Nationality</div>
                <div className="info-value" style={{ color: '#ffffff' }}>{driver.nationality}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Racing Number</div>
                <div className="info-value" style={{ color: '#ffffff' }}>{driver.number}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Current Team</div>
                <div className="info-value" style={{ color: '#ffffff' }}>{driver.team}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="season-results">
          <h2>2025 Season Results</h2>
          <div className="results-table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Race</th>
                  <th>Circuit</th>
                  <th>Grid</th>
                  <th>Result</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bahrain Grand Prix</td>
                  <td>Bahrain International Circuit</td>
                  <td>2</td>
                  <td>1</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>Saudi Arabian Grand Prix</td>
                  <td>Jeddah Corniche Circuit</td>
                  <td>1</td>
                  <td>1</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>Australian Grand Prix</td>
                  <td>Albert Park Circuit</td>
                  <td>1</td>
                  <td>DNF</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Japanese Grand Prix</td>
                  <td>Suzuka Circuit</td>
                  <td>1</td>
                  <td>1</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>Chinese Grand Prix</td>
                  <td>Shanghai International Circuit</td>
                  <td>1</td>
                  <td>2</td>
                  <td>18</td>
                </tr>
                <tr>
                  <td>Miami Grand Prix</td>
                  <td>Miami International Autodrome</td>
                  <td>1</td>
                  <td>1</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>Emilia Romagna Grand Prix</td>
                  <td>Autodromo Enzo e Dino Ferrari</td>
                  <td>1</td>
                  <td>1</td>
                  <td>26</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>      </div>
        {/* Development indicator to show when data was last loaded */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="dev-indicator" style={{ 
          marginTop: '20px', 
          fontSize: '12px', 
          color: '#adb5bd', 
          textAlign: 'center',
          background: '#262626',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <p>Data refreshed at: {new Date().toLocaleTimeString()}</p>
          <p>Driver ID: {driver.id} | Name: {driver.name}</p>
          <button 
            onClick={refreshData}            style={{ 
              fontSize: '12px', 
              padding: '3px 10px', 
              cursor: 'pointer',
              background: '#1e1e1e',
              color: '#ff6b6b',
              border: '1px solid #ff6b6b',
              borderRadius: '4px',
              marginTop: '5px'
            }}
          >
            Manual Refresh
          </button>
        </div>
      )}
    </div>
  );
}

export default DriverProfilePage;
