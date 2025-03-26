const Manufacturer = require('../models/manufacturer');
const Car = require('../models/cars');
const message = require('../messages/messages') 

const createManufacturer = async (req, res) => {
  try {
    console.log(req.body);
    const { manufacturer } = req.body;

    const manufacturerData = await Manufacturer.create(manufacturer);

    res.status(200).json({
      data: manufacturerData,
      message: `${req.method} - ${messages.MANUFACTURER_CREATED}`, 
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error creating manufacturer: ${error.message}`
    });
  }
};
 
const getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id)
      .populate('cars', '_id')
      .select('-__v');

    if (!manufacturer) {
      return res.status(404).json({ success: false, message: messages.MANUFACTURER_NOT_FOUND }); 
    }

    res.status(200).json({
      data: manufacturer,
      success: true,
      message: `${req.method} - Manufacturer fetched`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: messages.ERROR });
  }
};

const getManufacturers = async (req, res) => {
  try {
    const { minCars, maxCars, name } = req.query;
    
    let filter = {};
    
    if (minCars) filter.carsCount = { $gte: parseInt(minCars) };
    if (maxCars) filter.carsCount = { ...filter.carsCount, $lte: parseInt(maxCars) };
    if (name) filter.name = { $regex: name, $options: 'i' };
    let query = Manufacturer.find(filter);


    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }


    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy); 
    }


    const limit = parseInt(req.query.limit) || 10;  
    const page = parseInt(req.query.page) || 1;  
    const skip = (page - 1) * limit;  

    query = query.skip(skip).limit(limit);

 
    const manufacturers = await query;

    res.status(200).json({
      data: manufacturers,
      success: true,
      message: 'Manufacturers fetched successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching manufacturers', error: error.message });
  }
};


const updateManufacturer = async (req, res) => {
  try {
    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
      req.params.id,
      req.body.manufacturer,
      { new: true }
    );

    if (!updatedManufacturer) {
      return res.status(404).json({ success: false, message: messages.MANUFACTURER_NOT_FOUND }); 
    }

    res.status(200).json({
      data: updatedManufacturer,
      success: true,
      message: messages.MANUFACTURER_UPDATED 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: messages.ERROR });
  }
};

const deleteManufacturer = async (req, res) => {
  try {
    const deletedManufacturer = await Manufacturer.findByIdAndDelete(req.params.id);

    if (!deletedManufacturer) {
      return res.status(404).json({ success: false, message: messages.MANUFACTURER_NOT_FOUND }); 
    }

    res.status(200).json({
      data: deletedManufacturer,
      success: true,
      message: messages.MANUFACTURER_DELETED
    });
  } catch (error) {
    res.status(500).json({ success: false, message: messages.ERROR });
  }
};

module.exports = {
  createManufacturer,
  getManufacturerById,
  getManufacturers,
  updateManufacturer,
  deleteManufacturer
};
