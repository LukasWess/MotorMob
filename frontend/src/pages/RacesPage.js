import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { images } from '../assets/images';
import { mockRaceCalendar } from '../data/mockData';
import '../styles/RacesPage.css';

function RacesPage() {
  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      try {
        // Convert mockRaceCalendar entries to have status property
        const currentDate = new Date();
        const formattedRaces = mockRaceCalendar.map(race => ({
          ...race,
          status: new Date(race.date) > currentDate ? 'upcoming' : 'completed',
          thumbnail: images.circuits[race.circuit.toLowerCase().replace(/\s+/g, '')] || 
                    'https://via.placeholder.com/400x250?text=' + race.circuit
        }));
        
        setRaces(formattedRaces);
        setLoading(false);
      } catch (error) {
        console.error('Error loading races:', error);
        setError('Failed to load races. Please try again later.');
        setLoading(false);
      }
    }, 800);
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
                        <span className="detail-value">{race.time || '14:00'}</span>
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
                              <span className="driver">{race.result?.winner || 'TBD'}</span>
                              <span className="team">{race.result?.team || ''}</span>
                            </div>
                            <div className="podium-position">
                              <span className="position">2</span>
                              <span className="driver">{race.result?.second || 'TBD'}</span>
                            </div>
                            <div className="podium-position">
                              <span className="position">3</span>
                              <span className="driver">{race.result?.third || 'TBD'}</span>
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
