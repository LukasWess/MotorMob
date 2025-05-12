import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DriverCard.css';

function DriverCard({ driver, onEdit, onDelete }) {
  return (
    <div className="driver-card card">
      <div className="driver-header">
        <h3 className="driver-name">{driver.name}</h3>
        <span className={`status-badge status-${driver.status || 'active'}`}>
          {driver.status || 'active'}
        </span>
      </div>
      <div className="driver-details">
        <p><strong>License:</strong> {driver.licenseNumber}</p>
        <p><strong>Phone:</strong> {driver.phoneNumber}</p>
        <p><strong>Email:</strong> {driver.email}</p>
      </div>
      <div className="driver-actions">
        <Link 
          to={`/drivers/${driver.id}`} 
          className="btn btn-primary btn-sm"
        >
          View Profile
        </Link>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(driver)}
        >
          Edit
        </button>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(driver.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DriverCard;
