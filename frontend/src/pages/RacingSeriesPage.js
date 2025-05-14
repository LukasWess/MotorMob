import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { seriesService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/RacingSeriesPage.css';

function RacingSeriesPage() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await seriesService.getAllSeries();
        setSeries(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching racing series:', error);
        setError('Failed to load racing series. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  if (loading) {
    return <div className="loading-container"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="racing-series-page">
      <div className="page-header">
        <h1>Racing Series</h1>
        <p className="subheading">Select a racing series to view its drivers</p>
      </div>
      
      <div className="series-grid">
        {series.map(series => (
          <Link to={`/series/${series.id}/drivers`} key={series.id} className="series-card-link">
            <div className="series-card" style={{ borderColor: series.primaryColor }}>
              <div className="series-logo-container">
                <img src={series.logo} alt={`${series.name} logo`} className="series-logo" />
              </div>
              <div className="series-info">
                <h2 className="series-name">{series.name}</h2>
                <p className="series-description">{series.description}</p>
                <div className="series-stats">
                  <span className="series-drivers-count">
                    <i className="fas fa-user-circle"></i> {series.driversCount} Drivers
                  </span>
                </div>
              </div>
              <div className="series-action">
                <span className="view-drivers-btn" style={{ backgroundColor: series.primaryColor }}>
                  View Drivers <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RacingSeriesPage;
