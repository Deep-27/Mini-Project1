// app.js

const express = require('express');
const mongoose = require('mongoose');
const Chart = require('./models/chartModel');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Route to create a new chart
app.post('/charts', async (req, res) => {
    try {
      const { type, title, data } = req.body;
      const newChart = new Chart({ type, title, data });
      await newChart.save();
      res.status(201).json({ message: 'Chart saved successfully' });
    } catch (err) {
      console.error('Error creating chart:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Route to update an existing chart
app.put('/charts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, data } = req.body;
    const updatedChart = await Chart.findByIdAndUpdate(id, { type, title, data }, { new: true });
    res.status(200).json(updatedChart);
  } catch (err) {
    console.error('Error updating chart:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Other routes...

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
