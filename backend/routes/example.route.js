const express = require('express');
const router = express.Router();

// GET example endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Example route is working!',
    timestamp: new Date().toISOString()
  });
});

// POST example endpoint
router.post('/', (req, res) => {
  const data = req.body;
  
  // Validate the request body
  if (!data) {
    return res.status(400).json({ error: 'Request body is required' });
  }
  
  // Process the data (this is just an example)
  res.status(201).json({
    message: 'Data received successfully',
    data,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
