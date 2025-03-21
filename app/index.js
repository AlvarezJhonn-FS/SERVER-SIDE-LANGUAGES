const express = require('express');
const morgan = require('morgan');
const geoDataRoutes = require('./routes/geoDataRoutes');

const app = express();


app.use(morgan('dev')); 
app.use(express.json());


app.use('/api/geo-data', geoDataRoutes);


app.use((req, res) => {
  res.status(404).json({
    message: "ROUTES NOT FOUND",
    success: false
  });
});

module.exports = app;
