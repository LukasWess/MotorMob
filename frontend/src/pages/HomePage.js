import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConnectionTest from '../components/ConnectionTest';
import UpcomingRaces from '../components/UpcomingRaces';
import TopDrivers from '../components/TopDrivers';
import NewsFeed from '../components/NewsFeed';
import { images } from '../assets/images';
import { mockUpcomingRaces, mockStandings } from '../data/mockData';
import '../styles/HomePage.css';

function HomePage() {
  const [upcomingRaces, setUpcomingRaces] = useState([]);
  const [topDrivers, setTopDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      try {
        // Use mock data
        setUpcomingRaces(mockUpcomingRaces);
        setTopDrivers(mockStandings);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    }, 800);
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section" style={{ backgroundImage: `url(${images.backgrounds.hero})` }}>
        <div className="hero-content">
          <h1>Welcome to MotorMob</h1>
          <p>Your ultimate destination for motorsport news, results, and stats</p>
          <div className="hero-cta">
            <Link to="/races" className="btn btn-primary">View Upcoming Races</Link>
            <Link to="/standings" className="btn btn-secondary">Championship Standings</Link>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading content...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          {error}
        </div>
      ) : (
        <div className="dashboard">
          <div className="dashboard-row">
            <div className="dashboard-column upcoming-races-column">
              <UpcomingRaces races={upcomingRaces} />
            </div>
            
            <div className="dashboard-column news-column">
              <NewsFeed />
            </div>
          </div>
          
          <div className="dashboard-row">
            <div className="dashboard-column standings-column">
              <TopDrivers drivers={topDrivers} />
            </div>
            
            <div className="dashboard-column features-column">
              <div className="features dashboard-card">
                <h2 className="section-title">Features</h2>
                <div className="feature-list">
                  <div className="feature-item">
                    <div className="feature-icon">🏁</div>
                    <div className="feature-content">
                      <h3>Live Race Updates</h3>
                      <p>Get real-time updates during races including positions, lap times, and pit stops.</p>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">🔔</div>
                    <div className="feature-content">
                      <h3>Race Reminders</h3>
                      <p>Never miss a race with customizable notifications and calendar integration.</p>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">⭐</div>
                    <div className="feature-content">
                      <h3>Favorite Drivers</h3>
                      <p>Follow your favorite drivers and get personalized updates about their performance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Uncomment to test API connection */}
      {/* <ConnectionTest /> */}
    </div>
  );
}

export default HomePage;
