import React, { useState, useEffect } from 'react';
import { driverService } from '../services/api.js';
import DriverCard from '../components/DriverCard';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/DriversPage.css';

function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    phoneNumber: '',
    email: '',
    status: 'active'
  });

  // Fetch all drivers when component mounts
  useEffect(() => {
    fetchDrivers();
  }, []);

  // Function to fetch drivers from API
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await driverService.getAllDrivers();
      setDrivers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load drivers. Please try again later.');
      console.error('Error fetching drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await driverService.createDriver(formData);
      setFormData({
        name: '',
        licenseNumber: '',
        phoneNumber: '',
        email: '',
        status: 'active'
      });
      setShowForm(false);
      fetchDrivers();
    } catch (err) {
      setError('Failed to create driver. Please try again.');
      console.error('Error creating driver:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle driver deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      try {
        setLoading(true);
        await driverService.deleteDriver(id);
        fetchDrivers();
      } catch (err) {
        setError('Failed to delete driver. Please try again.');
        console.error('Error deleting driver:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="drivers-page">
      <div className="page-header">
        <h1>Drivers</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Driver'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="card driver-form-container">
          <h2>Add New Driver</h2>
          <form onSubmit={handleSubmit} className="driver-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="licenseNumber">License Number</label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Driver'}
            </button>
          </form>
        </div>
      )}      {loading && !showForm ? (
        <LoadingSpinner message="Loading drivers..." />
      ) : (
        <>
          {drivers.length === 0 ? (
            <div className="empty-state">
              <p>No drivers found. Add your first driver to get started.</p>
            </div>
          ) : (
            <div className="drivers-grid">
              {drivers.map(driver => (
                <DriverCard 
                  key={driver.id} 
                  driver={driver} 
                  onEdit={() => {/* Edit functionality */}} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DriversPage;
