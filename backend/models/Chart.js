// models/Chart.js
const mongoose = require('../db');

const chartSchema = new mongoose.Schema({
    type: String,
    title: String,
    data: [mongoose.Schema.Types.Mixed]
});

const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart;
