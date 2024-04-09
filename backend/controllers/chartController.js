// controllers/chartController.js
const Chart = require('../models/Chart');

exports.getAllCharts = async (req, res) => {
  try {
    const charts = await Chart.find();
    res.json(charts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createChart = async (req, res) => {
  const chart = new Chart({
    type: req.body.type,
    title: req.body.title,
    data: req.body.data
  });

  try {
    const newChart = await chart.save();
    res.status(201).json(newChart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Implement other controller functions (getChartById, updateChart, deleteChart) similarly
