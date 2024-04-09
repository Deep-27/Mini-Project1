const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
  type: String,
  title: String,
  data: Array,
});

const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart;