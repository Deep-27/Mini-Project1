// models/chartModel.js
const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['line', 'bar', 'pie'], // Validate chart type
    required: true
  },
  title: {
    type: String,
    required: true
  },
  data: [Number] // Assuming data is an array of numbers
});

const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart;
