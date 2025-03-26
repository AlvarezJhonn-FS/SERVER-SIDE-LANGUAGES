const Car = require('../models/cars');

const createCar = async (req, res) => {
  try {
    const { car } = req.body;

    if (!car) {
      return res.status(400).json({ success: false, message: 'Car data is required' });
    }

    const newCar = await Car.create(car);
    res.status(200).json({
      data: newCar,
      message: `${req.method} - Car created successfully`
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

const getCarId = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    return res.status(200).json({
      data: car,
      success: true,
      message: `${req.method} - REQUEST MADE`
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const getCar = async (req, res) => {
  try {
    let queryString = JSON.stringify(req.query);
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    let query = Car.find(JSON.parse(queryString));

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields); 
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy); 
    }

    const price = parseInt(req.query.price) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const pages = parseInt(req.query.pages) || 1;
    const year = parseInt(req.query.year) || 1885;

    query = query.where('price').gte(price);
    query = query.limit(limit); 
    query = query.where('year').gte(year);
    query = query.skip(skip);

    const car = await query;

    if (car.length === 0) {  
      return res.status(404).json({ success: false, message: "No cars found" });
    }

    res.status(200).json({
      data: car,
      success: true,
      message: `${req.method} - Cars fetched successfully`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const putCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body.car;

    const updatedCar = await Car.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    } 

    res.status(200).json({
      data: updatedCar,
      success: true,
      message: 'Car updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.status(200).json({
      data: deletedCar,
      success: true,
      message: `${req.method} - REQUEST MADE`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error occurred while deleting car: ${error.message}`,
    });
  }
};

module.exports = { createCar, getCarId, getCar, putCar, deleteCar };
