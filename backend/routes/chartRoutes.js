// routes/chartRoutes.js
const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

router.get('/', chartController.getAllCharts);
router.post('/', chartController.createChart);
router.get('/:id', chartController.getChartById);
router.put('/:id', chartController.updateChart);
router.delete('/:id', chartController.deleteChart);

module.exports = router;
