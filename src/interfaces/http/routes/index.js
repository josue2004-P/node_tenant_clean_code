const express = require('express');
const router = express.Router();

const userRoutes = require('./v1/user.routes');
const companyRoutes = require('./v1/company.routes');
const authenticationRoutes = require('./v1/authentication.routes');
const redisRoutes = require('./v1/redis.routes');
const emailRoutes = require('./v1/email.routes');
const permissionRoutes = require('./v1/permission.routes');
const profileRoutes = require('./v1/profile.routes');
// const medicalEquipmentRoutes = require('./v1/medical.equipment.routes');
const buildingLocationRoutes = require('./v1/building.location.routes');

router.use('/companies', companyRoutes);
router.use('/users', userRoutes);
router.use('/permissions', permissionRoutes);
router.use('/profiles', profileRoutes);

// router.use('/medical-equipment', medicalEquipmentRoutes);
router.use('/building-location', buildingLocationRoutes);

router.use('/authentication', authenticationRoutes);

router.use('/redis', redisRoutes);
router.use('/email', emailRoutes);


module.exports = router;