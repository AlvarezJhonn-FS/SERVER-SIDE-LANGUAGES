const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//FS file system to store data
const dataPath = path.join(__dirname, '../data.json');

const readDataFromFile = () => {
    try{
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file', err);
        return [];
    }
}

const writeDataToFile = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

//Post
router.post('/', (req, res) => {
    const {data} = req.body;
    const dataStored = readDataFromFile();
    const newItem = {id : dataStored.length + 1, data};
    dataStored.push(newItem);
    writeDataToFile(dataStored);

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
const items = readDataFromFile();

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
        const dataStored = readDataFromFile();
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
        const dataStored = readDataFromFile();
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
        item.data = data;
        writeDataToFile(dataStored);
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

    router.delete('/:id/9', (req, res) => {
        const {id} = req.params;
        const dataStored = readDataFromFile();
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
        const index = dataStored.indexOf(item);
        dataStored.splice(index, 1);
        writeDataToFile(dataStored);
        res.status(200).json({
            message : 'Delete api is working',
            data: item,
            metadata : {
                hostname : req.hostname,
                method : req.method,
            },
          });
        }
    );


module.exports = router;
