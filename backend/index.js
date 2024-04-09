// index.js or server.js

const express = require('express');
const mongoose = require('mongoose');
const Chart = require('./models/Chart');

const app = express();
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/MiniProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema for chart data
const chartSchema = new mongoose.Schema({
  type: String,
  title: String,
  data: Array,
});

// Create a model based on the schema
const Chart = mongoose.model('Chart', chartSchema);

// Define route to save chart data
app.post('/charts', async (req, res) => {
  try {
    const chartData = req.body;
    const chart = new Chart(chartData);
    await chart.save();
    res.status(201).json({ message: 'Chart saved successfully' });
  } catch (error) {
    console.error('Error saving chart:', error);
    res.status(500).json({ error: 'Failed to save chart' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
