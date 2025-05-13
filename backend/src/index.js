require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, Driver } = require('../models');
const { testConnection } = require('../config/database');
const motorsportRoutes = require('../routes/motorsport.route');

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => res.send('MotorMob API Running'));

// Mount motorsport routes
app.use('/motorsport', motorsportRoutes);

// Get all drivers
app.get('/drivers', async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.json(drivers);
  } catch (err) {
    console.error('Error getting drivers:', err);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

// Get driver by ID
app.get('/drivers/:id', async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(driver);
  } catch (err) {
    console.error('Error getting driver:', err);
    res.status(500).json({ error: 'Failed to fetch driver' });
  }
});

// Create a new driver
app.post('/drivers', async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json(driver);
  } catch (err) {
    console.error('Error creating driver:', err);
    res.status(400).json({ error: 'Failed to create driver', details: err.message });
  }
});

// Update a driver
app.put('/drivers/:id', async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    await driver.update(req.body);
    res.json(driver);
  } catch (err) {
    console.error('Error updating driver:', err);
    res.status(400).json({ error: 'Failed to update driver', details: err.message });
  }
});

// Delete a driver
app.delete('/drivers/:id', async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    await driver.destroy();
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting driver:', err);
    res.status(500).json({ error: 'Failed to delete driver' });
  }
});

const PORT = process.env.PORT || 3000;

// Start the server
async function startServer() {
  try {
    // Test the database connection
    await testConnection();
    
    // Sync the models with the database
    await sequelize.sync({ alter: true });
    
    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();
