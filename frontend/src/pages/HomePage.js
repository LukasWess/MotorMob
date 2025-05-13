import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConnectionTest from '../components/ConnectionTest';
import UpcomingRaces from '../components/UpcomingRaces';
import TopDrivers from '../components/TopDrivers';
import NewsFeed from '../components/NewsFeed';
import { images } from '../assets/images';
import { mockUpcomingRaces, mockStandings, mockRacingSeries } from '../data/mockData';
import '../styles/HomePage.css';
import '../styles/EventsGrid.css';

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
          <div className="left-sidebar compact-sidebar dark-sidebar">
            <nav className="series-navigation">
              <ul>
                {mockRacingSeries.map(series => (
                  <li key={series.id} className="series-list-item">
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
          <div className="center-panel homepage-center-panel dark-center-panel">
            {/* Tab/Filter Bar */}
            <div className="tab-filter-bar">
              <button className="tab-btn active">Ongoing</button>
              <button className="tab-btn">On TV</button>
              <button className="tab-btn">By time</button>
              <button className="tab-btn filter-btn">
                <i className="fas fa-filter"></i> Filter
              </button>
            </div>
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
            {/* Group events by series */}
            <div className="events-grouped">
              {Object.entries(groupRacesBySeries(upcomingRaces)).map(([series, races]) => (
                <div className="series-group" key={series}>
                  <div className="series-group-header">
                    <span className="series-dot" style={{ backgroundColor: getMockSeriesColor(series) }}></span>
                    <span className="series-title">{series}</span>
                  </div>
                  <div className="series-events-list">
                    {races.map((race, index) => (
                      <div className="event-card match-card dark-event-card" key={race.id || index}>
                        <div className="event-header" style={{ backgroundColor: getMockSeriesColor(race.series) }}>
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
              ))}
            </div>
          </div>
          {/* Right Sidebar - News and League Table */}
          <div className="right-sidebar compact-sidebar dark-sidebar">
            <div className="news-header">
              <h2>NEWS</h2>
              <a href="#" className="view-all-link">View All</a>
            </div>
            <div className="news-feed-container">
              <NewsFeed compact={true} />
            </div>
            <div className="league-table-container dark-league-table">
              <h3 className="league-table-title">Premier League</h3>
              <table className="league-table">
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Team</th>
                    <th>PL</th>
                    <th>GD</th>
                    <th>PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example static data, replace with real data as needed */}
                  <tr><td>1</td><td>Liverpool</td><td>36</td><td>+49</td><td>83</td></tr>
                  <tr><td>2</td><td>Arsenal</td><td>36</td><td>+33</td><td>68</td></tr>
                  <tr><td>3</td><td>Newcastle</td><td>36</td><td>+23</td><td>66</td></tr>
                  <tr><td>4</td><td>Man City</td><td>36</td><td>+29</td><td>65</td></tr>
                  <tr><td>5</td><td>Chelsea</td><td>36</td><td>+27</td><td>63</td></tr>
                </tbody>
              </table>
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

  // Helper function to group races by series
  function groupRacesBySeries(races) {
    return races.reduce((acc, race) => {
      if (!acc[race.series]) acc[race.series] = [];
      acc[race.series].push(race);
      return acc;
    }, {});
  }
}

export default HomePage;
