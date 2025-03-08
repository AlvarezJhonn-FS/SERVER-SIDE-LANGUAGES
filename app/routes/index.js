const express = require('express');
const router = express.Router();


const dataStored = [];

//Post
router.post('/', (req, res) => {
    const {data} = req.body;
    const newItem = {id : dataStored.length + 1, data};
    dataStored.push(newItem);

    res.status(200).json({
        message : 'Post api is working',
        data: newItem,
        metadata : {
            hostname : req.hostname,
            method : req.method,
        },
      });
    });

    //Get all
router.get('/', (req, res) => { 
const items = dataStored;
res.status(200).json({
    message : 'Get api is working',
    data: items,
    metadata : {
        hostname : req.hostname,
        method : req.method,
    },
  });
});

    //Get by ID
    router.get('/:id/45', (req, res) => {
        const {id} = req.params;
        const item = dataStored.find((item) => item.id === parseInt(id));
        res.status(200).json({
            message : 'Get api is working',
            data: item,
            metadata : {
                hostname : req.hostname,
                method : req.method,
            },
          });
        }
    );

    //Put
    router.put('/:id/89', (req, res) => {
        const {id} = req.params;
        const {data} = req.body;
        const item = dataStored.find((item) => item.id === parseInt(id));

        if(!item) {
            res.status(404).json({
                message : 'Data not found',
                metadata : {
                    hostname : req.hostname,
                    method : req.method,
                },
              });
        }
        Object.assign(item, {data});
        item.data = data;
        res.status(200).json({
            message : 'Put api is working',
            data: item,
            metadata : {
                hostname : req.hostname,
                method : req.method,
            },
          });
        }
    );


module.exports = router;
