const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const companyRoutes = require('./company.routes');
const authenticationRoutes = require('./authentication.routes');
const redisRoutes = require('./redis.routes');

router.use('/user', userRoutes);
router.use('/company', companyRoutes);
router.use('/authentication', authenticationRoutes);

router.use('/redis', redisRoutes);

module.exports = router;