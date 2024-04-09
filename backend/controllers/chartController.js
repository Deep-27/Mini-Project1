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

exports.getChartById = async (req, res) => {
    try {
        const chart = await Chart.findById(req.params.id);
        if (!chart) {
            return res.status(404).json({ message: 'Chart not found' });
        }
        res.json(chart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateChart = async (req, res) => {
    try {
        const updatedChart = await Chart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedChart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteChart = async (req, res) => {
    try {
        const chart = await Chart.findByIdAndDelete(req.params.id);
        if (!chart) {
            return res.status(404).json({ message: 'Chart not found' });
        }
        res.json(chart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
