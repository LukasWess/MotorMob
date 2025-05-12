import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopDrivers.css';

function TopDrivers({ drivers }) {
  return (
    <section className="top-drivers dashboard-card">
      <h2 className="section-title">Championship Leaders</h2>
      <div className="drivers-list">
        {drivers.map(driver => (
          <Link to={`/drivers/${driver.id}`} className="driver-standing-link" key={driver.id}>
            <div className="driver-standing-item">
              <div className="driver-position">{driver.position}</div>
              <div className="driver-info">
                <h3 className="driver-name">{driver.name}</h3>
                <p className="driver-team">{driver.team}</p>
                <span className="driver-series">{driver.series}</span>
              </div>
              <div className="driver-points">
                <span className="points-value">{driver.points}</span>
                <span className="points-label">PTS</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/standings" className="view-all-link">View full standings</Link>
    </section>
  );
}

export default TopDrivers;
