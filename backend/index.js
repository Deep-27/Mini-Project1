// index.js
const express = require('express');
const cors = require('cors');
const chartRoutes = require('./routes/chartRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/charts', chartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
