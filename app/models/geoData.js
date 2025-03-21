const mongoose = require('mongoose');

const geoDataSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  weather: {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    visibility: { type: Number, required: true },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('GeoData', geoDataSchema);

