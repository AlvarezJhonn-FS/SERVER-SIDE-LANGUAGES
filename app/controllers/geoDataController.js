const GeoData = require('../models/geoData');
const axios = require('axios');

// POST - Create GeoData and save to MongoDB
const postGeoData = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
      return res.status(400).json({
        message: 'Latitude and longitude are required.',
        success: false,
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    const weatherResponse = await axios.get(weatherUrl);
    const weatherData = weatherResponse.data;

    const weatherInfo = {
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      visibility: weatherData.visibility
    };

    // Store weather as an object, not string
    const newGeoData = await GeoData.create({
      latitude,
      longitude,
      weather: weatherInfo
    });

    res.status(200).json({
      message: 'GeoData created successfully with weather details.',
      data: newGeoData,
      success: true,
    });
  } catch (error) {
    console.error('Error in postGeoData:', error);  // Log full error
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
      success: false,
    });
  }
};


// GET - Retrieve all GeoData from MongoDB
const getGeoData = async (req, res) => {
  try {
    const geoData = await GeoData.find().select('-__v'); // Exclude __v

    if (!geoData || geoData.length === 0) {
      return res.status(404).json({
        message: 'No GeoData found.',
        success: false,
      });
    }

    res.status(200).json({
      message: 'GeoData retrieved successfully.',
      data: geoData,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
      success: false,
    });
  }
};

// GET - Retrieve GeoData by ID
const getGeoDataById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const geoData = await GeoData.findById(id).select('-__v');

    if (!geoData) {
      return res.status(404).json({
        message: 'GeoData not found.',
        success: false,
      });
    }

    res.status(200).json({
      message: 'GeoData retrieved successfully.',
      data: geoData,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
      success: false,
    });
  }
};

// PUT - Update GeoData by ID
const updateGeoDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    const updateFields = {};
    if (latitude != null) updateFields.latitude = latitude;
    if (longitude != null) updateFields.longitude = longitude;

    if (latitude != null && longitude != null) {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      const weatherResponse = await axios.get(weatherUrl);
      const weatherData = weatherResponse.data;

      updateFields.weather = JSON.stringify({
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        visibility: weatherData.visibility,
      });
    }

    const updatedGeoData = await GeoData.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    ).select('-__v');

    if (!updatedGeoData) {
      return res.status(404).json({
        message: 'GeoData not found.',
        success: false,
      });
    }

    res.status(200).json({
      message: 'GeoData updated successfully.',
      data: updatedGeoData,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
      success: false,
    });
  }
};

// DELETE - Remove GeoData by ID
const deleteGeoData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await GeoData.findByIdAndDelete(id).select('-__v');

    if (!deletedData) {
      return res.status(404).json({
        message: 'GeoData not found.',
        success: false,
      });
    }

    res.status(200).json({
      message: 'GeoData deleted successfully.',
      data: deletedData,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
      success: false,
    });
  }
};

// GET - Fetch fresh weather data (no DB interaction)
const fetchFreshWeatherData = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: 'Latitude and longitude query parameters are required.',
        success: false,
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    const weatherResponse = await axios.get(weatherUrl);
    const weatherData = weatherResponse.data;

    const weatherInfo = {
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      visibility: weatherData.visibility,
    };

    res.status(200).json({
      message: 'Weather data fetched successfully.',
      data: weatherInfo,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching weather data.',
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  postGeoData,
  getGeoData,
  getGeoDataById,
  updateGeoDataById,
  deleteGeoData,
  fetchFreshWeatherData,
};




