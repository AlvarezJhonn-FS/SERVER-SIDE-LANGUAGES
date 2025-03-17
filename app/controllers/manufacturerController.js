const Manufacturer = require('../models/manufacturer');
const Car = require('../models/cars');

const createManufacturer = async (req, res) => {
  try {
    console.log(req.body);
    const { manufacturer } = req.body;

    const manufacturerData = await Manufacturer.create(manufacturer);

    res.status(200).json({
      data: manufacturerData,
      message: `${req.method} - Manufacturer created successfully`,
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
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }
    res.status(200).json({
      data: manufacturer,
      success: true,
      message: `${req.method} - Manufacturer fetched`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching manufacturer" });
  }
};

const getManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find({});
    res.status(200).json({
      data: manufacturers,
      success: true,
      message: `${req.method} - Manufacturers fetched`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching manufacturers" });
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
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }

    res.status(200).json({
      data: updatedManufacturer,
      success: true,
      message: "Manufacturer updated"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating manufacturer" });
  }
};

const deleteManufacturer = async (req, res) => {
  try {
    const deletedManufacturer = await Manufacturer.findByIdAndDelete(req.params.id);

    if (!deletedManufacturer) {
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }

    res.status(200).json({
      data: deletedManufacturer,
      success: true,
      message: "Manufacturer deleted"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting manufacturer" });
  }
};

module.exports = {
  createManufacturer,
  getManufacturerById,
  getManufacturers,
  updateManufacturer,
  deleteManufacturer
};
