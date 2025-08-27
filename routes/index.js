const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/passengers', require('./passengerRoutes'));
router.use('/drivers', require('./driverRoutes'));
router.use('/staff', require('./staffRoutes'));
router.use('/roles', require('./roleRoutes'));
router.use('/permissions', require('./permissionRoutes'));
router.use('/admins', require('./adminRoutes'));

module.exports = router;
