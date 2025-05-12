import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { motorsportService } from '../services/api';
import { images } from '../assets/images';
import '../styles/RacesPage.css';

function RacesPage() {
  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [error, setError] = useState(null);  useEffect(() => {
    const fetchRaces = async () => {
      try {
        setLoading(true);        // Try to get data from API
        try {
          const data = await motorsportService.getRaceCalendar();
          setRaces(data);
          setLoading(false);
          return;
        } catch (apiError) {
          console.log('API not available, using mock data', apiError);
          // If API fails, fall back to mock data
        }
        
        // Set mock data if API fails with a short timeout to simulate API call
        setTimeout(() => {
          setRaces([
            {
              id: 2,
              name: 'Indianapolis 500',
              circuit: 'Indianapolis Motor Speedway',
              date: 'May 26, 2025',
              time: '12:00',
              location: 'Indianapolis, USA',
              status: 'upcoming',
              series: 'IndyCar',
              thumbnail: images.circuits?.indianapolis || '/assets/circuits/indianapolis.jpg',
              details: {
                circuitLength: '4.023 km',
                laps: 200,
                distance: '804.672 km',
                lapRecord: {
                  time: '37.895',
                  driver: 'Scott Dixon',
                  year: 2022
                }
              }
            },
            {
              id: 3,
              name: 'Nürburgring 24 Hours',
              circuit: 'Nürburgring Nordschleife',
              date: 'June 1, 2025',
              time: '15:30',
              location: 'Nürburg, Germany',
              status: 'upcoming',
              series: 'GT Racing',
              thumbnail: images.circuits?.nurburgring || '/assets/circuits/nurburgring.jpg',
              details: {
                circuitLength: '25.378 km',
                laps: null, // Variable depending on time
                distance: null, // Distance covered in 24 hours
                lapRecord: {
                  time: '6:43.300',
                  driver: 'Timo Bernhard',
                  year: 2018
                }
              }
            },
            {
              id: 4,
              name: 'Australian Grand Prix',
              circuit: 'Albert Park Circuit',
              date: 'April 20, 2025',
              time: '14:00',
              location: 'Melbourne, Australia',
              status: 'completed',
              result: {
                winner: 'Max Verstappen',
                team: 'Red Bull Racing',
                second: 'Lewis Hamilton',
                third: 'Charles Leclerc'
              },
              series: 'Formula 1',
              thumbnail: images.circuits?.melbourne || '/assets/circuits/melbourne.jpg'
            },
            {
              id: 5,
              name: 'Chinese Grand Prix',
              circuit: 'Shanghai International Circuit',
              date: 'April 27, 2025',
              time: '14:00',
              location: 'Shanghai, China',
              status: 'completed',
              result: {
                winner: 'Lewis Hamilton',
                team: 'Mercedes',
                second: 'Max Verstappen',
                third: 'George Russell'
              },
              series: 'Formula 1',
              thumbnail: images.circuits?.shanghai || '/assets/circuits/shanghai.jpg'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to load races. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchRaces();
  }, []);
  
  const filteredRaces = races.filter(race => 
    activeTab === 'upcoming' ? race.status === 'upcoming' : race.status === 'completed'
  );
  
  return (
    <div className="races-page">
      <div className="page-header">
        <h1>Races</h1>
        <div className="race-tabs">
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      {loading ? (
        <LoadingSpinner message="Loading races..." />
      ) : (
        <>
          {filteredRaces.length === 0 ? (
            <div className="empty-state">
              <p>No {activeTab} races found.</p>
            </div>
          ) : (
            <div className="races-grid">
              {filteredRaces.map(race => (
                <div className="race-card" key={race.id}>
                  <div className="race-card-header">
                    <div className="race-series-badge">{race.series}</div>
                    <h2 className="race-title">{race.name}</h2>
                    <p className="race-circuit">{race.circuit}</p>
                  </div>
                  
                  <div className="race-card-content">
                    <div className="race-details">
                      <div className="race-detail-item">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">{race.date}</span>
                      </div>
                      <div className="race-detail-item">
                        <span className="detail-label">Time:</span>
                        <span className="detail-value">{race.time}</span>
                      </div>
                      <div className="race-detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{race.location}</span>
                      </div>
                      
                      {race.status === 'completed' && race.result && (
                        <div className="race-result">
                          <h3>Result</h3>
                          <div className="result-podium">
                            <div className="podium-position">
                              <span className="position">1</span>
                              <span className="driver">{race.result.winner}</span>
                              <span className="team">{race.result.team}</span>
                            </div>
                            <div className="podium-position">
                              <span className="position">2</span>
                              <span className="driver">{race.result.second}</span>
                            </div>
                            <div className="podium-position">
                              <span className="position">3</span>
                              <span className="driver">{race.result.third}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {race.status === 'upcoming' && (
                        <div className="race-countdown">
                          <button className="btn btn-primary">Set Reminder</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RacesPage;
