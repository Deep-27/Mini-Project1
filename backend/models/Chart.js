// models/Chart.js
const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
  type: String,
  title: String,
  data: [mongoose.Schema.Types.Mixed]
});

module.exports = mongoose.model('Chart', chartSchema);
