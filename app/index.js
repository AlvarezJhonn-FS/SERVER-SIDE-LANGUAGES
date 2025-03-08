const express = require('express');
const router = require('./routes');
const app = express();

app.use(express.json());
//localhost:3000/   
router.get('/api', (req, res) => {
    res.status(200).json({ 
        message : 'GET - root' ,
        metadata : {
            hostname : req.hostname,
            method : req.method, 
        }
     });
    });

 
    app.use('/api/v1', router);

    module.exports = app;