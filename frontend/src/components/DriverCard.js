import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DriverCard.css';

function DriverCard({ driver, onEdit, onDelete }) {
  // Use different styles based on if it's a motorsport driver (with number, nationality) or admin driver
  const isMotorsportDriver = driver.nationality && driver.number;

  return (
    <div className="driver-card card">      <div className="driver-header">
        <div className="header-left"></div> {/* Empty div for flex spacing */}
        <h3 className="driver-name">{driver.name}</h3>
        <div className="header-right">
          {isMotorsportDriver ? (
            <span className="driver-number">#{driver.number}</span>
          ) : (
            <span className={`status-badge status-${driver.status || 'active'}`}>
              {driver.status || 'active'}
            </span>
          )}
        </div>
      </div><div className="driver-details">
        {isMotorsportDriver ? (
          <>
            <div className="driver-profile-section">
              <div className="driver-image" style={{ 
                backgroundImage: `url(${driver.image || 'https://via.placeholder.com/180x180?text=Driver'})`,
              }}></div>
              <p className="driver-team">{driver.team}</p>
              <div className="driver-nationality-container">
                <span className="driver-nationality">
                  <span className="nationality-flag">🏁</span> {driver.nationality}
                </span>
              </div>
            </div>
            <div className="driver-stats">
              <div className="stat">
                <span className="stat-value">{driver.wins}</span>
                <span className="stat-label">Wins</span>
              </div>
              <div className="stat">
                <span className="stat-value">{driver.podiums}</span>
                <span className="stat-label">Podiums</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <p><strong>License:</strong> {driver.licenseNumber}</p>
            <p><strong>Phone:</strong> {driver.phoneNumber}</p>
            <p><strong>Email:</strong> {driver.email}</p>
          </>
        )}
      </div>
      
      <div className="driver-actions">
        <Link 
          to={`/drivers/${driver.id}`} 
          className="btn btn-primary btn-sm"
        >
          View Profile
        </Link>
        {!isMotorsportDriver && (
          <>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit && onEdit(driver)}
            >
              Edit
            </button>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => onDelete && onDelete(driver.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DriverCard;
