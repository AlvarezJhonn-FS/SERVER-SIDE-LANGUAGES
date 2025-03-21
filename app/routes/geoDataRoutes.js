const express = require('express');
const router = express.Router();
const {postGeoData, getGeoData, deleteGeoData, getGeoDataById, updateGeoDataById, fetchFreshWeatherData} = require('../controllers/geoDataController');


router.post('/', postGeoData);
router.get('/', getGeoData);
router.get('/fetch', fetchFreshWeatherData);
router.get('/:id', getGeoDataById);
router.put('/:id', updateGeoDataById);
router.delete('/:id', deleteGeoData);
module.exports = router;