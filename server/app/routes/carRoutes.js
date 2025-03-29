const express = require('express');
const router = express.Router();
const {createCar,getCar, getCarId, deleteCar, putCar} = require('../controllers/carController');

router.post('/', createCar);

router.get('/', getCar);

router.get('/:id', getCarId);

  router.put('/:id', putCar);

  router.delete('/:id', deleteCar);

  module.exports = router;