import React from 'react';
import { Link } from 'react-router-dom';
import { mockRacingSeries } from '../data/mockData';
import '../styles/RacingSeriesPage.css';

function RacingSeriesPage() {
  return (
    <div className="racing-series-page">
      <div className="page-header">
        <h1>Racing Series</h1>
        <p className="subheading">Select a racing series to view its drivers</p>
      </div>
      
      <div className="series-grid">
        {mockRacingSeries.map(series => (
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
