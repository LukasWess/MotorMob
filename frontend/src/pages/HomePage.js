import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConnectionTest from '../components/ConnectionTest';
import UpcomingRaces from '../components/UpcomingRaces';
import TopDrivers from '../components/TopDrivers';
import NewsFeed from '../components/NewsFeed';
import { images } from '../assets/images';
import { motorsportService } from '../services/api';
import '../styles/HomePage.css';

function HomePage() {
  const [upcomingRaces, setUpcomingRaces] = useState([]);
  const [topDrivers, setTopDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Try to get data from API
        try {
          // Fetch upcoming races and top drivers in parallel
          const [racesData, driversData] = await Promise.all([
            motorsportService.getUpcomingRaces(3),
            motorsportService.getStandings()
          ]);

          setUpcomingRaces(racesData);
          setTopDrivers(driversData);
          setLoading(false);
          return;
        } catch (apiError) {
          console.log('API not available, using mock data', apiError);
          // If API fails, fall back to mock data
        }

        // Mock data as fallback
        setTimeout(() => {
          setUpcomingRaces([
            {
              id: 1,
              name: 'Monaco Grand Prix',
              circuit: 'Circuit de Monaco',
              date: 'May 25, 2025',
              time: '14:00',
              location: 'Monte Carlo, Monaco',
              status: 'upcoming',
              series: 'Formula 1'
            },
            {
              id: 2,
              name: 'Indianapolis 500',
              circuit: 'Indianapolis Motor Speedway',
              date: 'May 26, 2025',
              time: '12:00',
              location: 'Indianapolis, USA',
              status: 'upcoming',
              series: 'IndyCar'
            },
            {
              id: 3,
              name: 'Nürburgring 24 Hours',
              circuit: 'Nürburgring Nordschleife',
              date: 'June 1, 2025',
              time: '15:30',
              location: 'Nürburg, Germany',
              status: 'upcoming',
              series: 'GT Racing'
            }
          ]);

          setTopDrivers([
            {
              id: 1,
              name: 'Max Verstappen',
              team: 'Red Bull Racing',
              points: 125,
              position: 1,
              nationality: 'Netherlands',
              series: 'Formula 1'
            },
            {
              id: 2,
              name: 'Lewis Hamilton',
              team: 'Mercedes',
              points: 110,
              position: 2,
              nationality: 'United Kingdom',
              series: 'Formula 1'
            },
            {
              id: 3,
              name: 'Scott Dixon',
              team: 'Chip Ganassi Racing',
              points: 95,
              position: 1,
              nationality: 'New Zealand',
              series: 'IndyCar'
            }
          ]);
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        setError('Failed to load homepage data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);  
  return (
    <div className="home-page">
      <section className="hero motorsport-hero" style={{ backgroundImage: `url(${images.backgrounds.hero})` }}>
        <div className="hero-content">
          <h1 className="hero-title">MotorMob</h1>
          <p className="hero-subtitle">Your Comprehensive Motorsport Companion</p>
          <div className="hero-buttons">
            <Link to="/races" className="btn btn-primary hero-btn">Live Races</Link>
            <Link to="/standings" className="btn btn-secondary hero-btn">Standings</Link>
          </div>
        </div>
      </section>
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading motorsport data...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
        </div>
      ) : (
        <div className="dashboard-grid">
          <UpcomingRaces races={upcomingRaces} />
          <TopDrivers drivers={topDrivers} />
          <NewsFeed />
        </div>
      )}
      
      <section className="test section" style={{display: 'none'}}>
        <div className="card">
          <h2 className="section-title">System Status</h2>
          <ConnectionTest />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
