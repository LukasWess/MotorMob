import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConnectionTest from '../components/ConnectionTest';
import UpcomingRaces from '../components/UpcomingRaces';
import TopDrivers from '../components/TopDrivers';
import NewsFeed from '../components/NewsFeed';
import { images } from '../assets/images';
import { mockUpcomingRaces, mockStandings, mockRacingSeries } from '../data/mockData';
import '../styles/HomePage.css';

function HomePage() {
  const [upcomingRaces, setUpcomingRaces] = useState([]);
  const [topDrivers, setTopDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Format date for "Today" label
  const formatTodayDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };

  return (
    <div className={`home-page ${darkMode ? 'dark' : 'light'}`}>
      {/* Top Header Bar */}
      <header className="top-header">
        <div className="logo">
          <h1>MOTORMOB</h1>
        </div>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search events, drivers, teams..." 
            className="search-input"
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        
        <div className="header-actions">
          <span className="news-text">NEWS</span>
          <button 
            className="theme-toggle" 
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>      </header>
      
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
        <div className="three-column-layout">
          {/* Left Sidebar - Navigation */}
          <div className="left-sidebar">
            <nav className="series-navigation">
              <ul>
                {mockRacingSeries.map(series => (
                  <li key={series.id}>
                    <Link to={`/series/${series.id}/drivers`} className="series-nav-item">
                      <span className="series-icon" style={{ color: series.primaryColor }}>
                        <i className="fas fa-flag-checkered"></i>
                      </span>
                      <span className="series-name">{series.shortName || series.name}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <div className="series-nav-item dropdown">
                    <span className="series-icon">
                      <i className="fas fa-list"></i>
                    </span>
                    <span className="series-name">All Leagues</span>
                    <span className="dropdown-arrow">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Center Panel - Main Content */}
          <div className="center-panel">
            <div className="content-header">
              <div className="today-label">
                <h2>Today</h2>
                <span className="date">{formatTodayDate()}</span>
              </div>
              
              <div className="filter-dropdown">
                <select className="filter-select">
                  <option value="all">All Events</option>
                  <option value="races">Races</option>
                  <option value="practice">Practice</option>
                  <option value="qualifying">Qualifying</option>
                </select>
              </div>
            </div>
            
            <div className="events-grid">
              <h3 className="events-title">Upcoming Events</h3>
              {upcomingRaces.map((race, index) => (
                <div className="event-card" key={race.id || index}>
                  <div className="event-header" style={{ 
                    backgroundColor: getMockSeriesColor(race.series) 
                  }}>
                    <span className="event-series">{race.series}</span>
                    <span className="event-type">Race</span>
                  </div>
                  <div className="event-body">
                    <h4 className="event-name">{race.name}</h4>
                    <div className="event-details">
                      <div className="event-location">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{race.location}</span>
                      </div>
                      <div className="event-date">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{race.date}</span>
                      </div>
                      <div className="event-circuit">
                        <i className="fas fa-road"></i>
                        <span>{race.circuit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="event-footer">
                    <Link to={`/races/${race.id}`} className="view-details-btn">
                      View Details <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Sidebar - News */}
          <div className="right-sidebar">
            <div className="news-header">
              <h2>NEWS</h2>
              <a href="#" className="view-all-link">View All</a>
            </div>
            <div className="news-feed-container">
              <NewsFeed compact={true} />
            </div>
          </div>
        </div>
      )}
      
      {/* Uncomment to test API connection */}
      {/* <ConnectionTest /> */}
    </div>
  );
  
  // Helper function to get color for racing series
  function getMockSeriesColor(seriesName) {
    const seriesMap = {
      'Formula 1': '#e10600',
      'IndyCar': '#1447b5',
      'NASCAR': '#ffd659',
      'Formula E': '#14b5a0',
      'WEC': '#2e5397'
    };
    
    return seriesMap[seriesName] || '#333333';
  }

}

export default HomePage;
