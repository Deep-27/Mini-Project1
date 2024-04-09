// index.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
