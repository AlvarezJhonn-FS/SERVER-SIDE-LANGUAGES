const Car = require('../models/cars');


const createCar = async (req, res) => {
  try{
    console.log(req.body);
    const {car} = req.body;
    const newCar = (await Car.create(car));
    res.status(200).json({ data: newCar, message: `${req.method} - REQUEST MADE` });
    if(!newCar){
      res.status(404).json({ success: false, message: "Car already exist" });
    }
  }
    catch (error) {
      res.status(404).json({ success: false, message: "Car already exists" });
  }
};

const getCarId = async (req, res) => {
  try{
    const car = await Car.findById(req.params.id);
      if (!car) {
          res.status(404).json({ success: false, message: "Car not found" });
      }
      res.status(200).json({ "data": car, success: true, message: `${req.method} - REQUEST MADE` });

      }
    catch (error) {
    res.status(404).json({ success: false, message: "Car not found" });
  }
};

const getCar = async (req, res) => {
    try {
      const cars = await Car.find({});
  
      if (cars.length === 0) {
        return res.status(404).json({ success: false, message: "No cars saved" });
      } else {
        return res.status(200).json({
          data: cars,
          success: true,
          message: `${req.method} - REQUEST MADE`
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

const putCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body.car;


    const updatedCar = await Car.findByIdAndUpdate(id, updates, { new: true });


      if (!updatedCar) {
        return res.status(404).json({ success: false, message: 'Car not found',
        });
      } 
      res.status(200).json({data: updatedCar,success: true,message: 'Car updated successfully',
      });

    } catch (error) {
     res.status(404).json({ success: false, message: "No cars saved" });

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


module.exports = {createCar, getCarId, getCar, putCar, deleteCar};