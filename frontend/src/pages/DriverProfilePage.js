import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { motorsportService } from '../services/api';
import { images } from '../assets/images';
import '../styles/DriverProfilePage.css';

function DriverProfilePage() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        setLoading(true);
        // Try to get data from API first
        try {
          const data = await motorsportService.getDriverProfile(id);
          setDriver(data);
          setLoading(false);
          return;
        } catch (apiError) {
          console.log('API not available, using mock data', apiError);
          // If API fails, fall back to mock data
        }

        // Mock data as fallback
        setTimeout(() => {          const mockDrivers = {
            "1": {
              id: 1,
              name: "Max Verstappen",
              number: 1,
              team: "Red Bull Racing",
              nationality: "Netherlands",
              dateOfBirth: "September 30, 1997",
              biography: "Max Emilian Verstappen is a Belgian-Dutch racing driver currently competing in Formula One, under the Dutch flag, with Red Bull Racing. At the 2015 Australian Grand Prix, when he was aged 17 years, 166 days, he became the youngest driver to compete in Formula One.",
              championships: 3,
              wins: 62,
              podiums: 105,
              polePositions: 42,
              fastestLaps: 32,
              currentSeasonPoints: 125,
              currentSeasonPosition: 1,
              image: images.drivers.verstappen
            },            "2": {
              id: 2,
              name: "Lewis Hamilton",
              number: 44,
              team: "Mercedes",
              nationality: "United Kingdom",
              dateOfBirth: "January 7, 1985",
              biography: "Sir Lewis Carl Davidson Hamilton MBE is a British racing driver currently competing in Formula One for Mercedes. A seven-time World Drivers' Championship winner, he is widely regarded as one of the greatest drivers in the history of the sport.",
              championships: 7,
              wins: 103,
              podiums: 191,
              polePositions: 104,
              fastestLaps: 61,
              currentSeasonPoints: 110,
              currentSeasonPosition: 2,
              image: images.drivers.hamilton
            },            "3": {
              id: 3,
              name: "Scott Dixon",
              number: 9,
              team: "Chip Ganassi Racing",
              nationality: "New Zealand",
              dateOfBirth: "July 22, 1980",
              biography: "Scott Ronald Dixon is a New Zealand professional racing driver who competes in the NTT IndyCar Series for Chip Ganassi Racing. Dixon has won the IndyCar championship six times: in 2003, 2008, 2013, 2015, 2018 and 2020.",
              championships: 6,
              wins: 53,
              podiums: 130,
              polePositions: 32,
              fastestLaps: 47,
              currentSeasonPoints: 95,
              currentSeasonPosition: 1,
              image: images.drivers.dixon
            }
          };

          if (mockDrivers[id]) {
            setDriver(mockDrivers[id]);
            setLoading(false);
          } else {
            setError("Driver not found");
            setLoading(false);
          }
        }, 800); // Simulate loading delay
      } catch (error) {
        setError("Failed to load driver profile");
        setLoading(false);
      }
    };

    fetchDriverProfile();
  }, [id]);

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
        <div className="profile-header-content">
          <div className="back-button-container">
            <Link to="/drivers" className="back-button">
              <i className="fas fa-arrow-left"></i> Back to Drivers
            </Link>
          </div>
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
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Date of Birth</div>
                <div className="info-value">{driver.dateOfBirth}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Nationality</div>
                <div className="info-value">{driver.nationality}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Racing Number</div>
                <div className="info-value">{driver.number}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Current Team</div>
                <div className="info-value">{driver.team}</div>
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
        </div>
      </div>
    </div>
  );
}

export default DriverProfilePage;
