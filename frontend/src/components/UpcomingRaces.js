import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UpcomingRaces.css';

function UpcomingRaces({ races }) {
  return (
    <section className="upcoming-races dashboard-card">
      <h2 className="section-title">Upcoming Races</h2>
      <div className="races-list">
        {races.map(race => (
          <div className="race-item" key={race.id}>
            <div className="race-date">
              <span className="day">{race.date.split(',')[0]}</span>
              <span className="time">{race.time}</span>
            </div>
            <div className="race-info">
              <h3 className="race-name">{race.name}</h3>
              <p className="race-circuit">{race.circuit}</p>
              <span className="race-series">{race.series}</span>
            </div>
            <div className="race-action">
              <button className="btn btn-sm">Remind me</button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/races" className="view-all-link">View all races</Link>
    </section>
  );
}

export default UpcomingRaces;
