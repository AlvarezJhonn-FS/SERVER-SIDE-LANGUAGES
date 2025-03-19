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
    const manufacturers = await Manufacturer.find({})
      .populate('_id') 
      .select('-__v');

    res.status(200).json({
      data: manufacturers,
      success: true,
      message: `${req.method} - Manufacturers fetched`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: messages.ERROR });
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
