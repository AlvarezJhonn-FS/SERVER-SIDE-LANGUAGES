const express = require('express');
const app = express();
const routeHandler = require('./routes'); 


app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API IS RUNNING', success: true });
});

app.use('/api/v1', routeHandler);
app.use("*", (req, res) => {
    res.status(404).json({ message: 'PAGE NOT FOUND', success: false });
    });

    
module.exports = app;