const express = require('express');
const router = express.Router();
const carRoutes = require('./carRoutes');
const manufacturerRoutes = require('./manufacturerRoutes');

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: `${req.method} - REQUEST MADE` });
});

router.use('/cars', carRoutes);
router.use("/manufacturers", manufacturerRoutes);

module.exports = router;