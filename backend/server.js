// server.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies

// Routes setup
app.use('/api/users', require('./routes/userRoutes')); // Example user routes

// Define environment variables
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

// Use these variables in your server configuration
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to the database using DATABASE_URL
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));
