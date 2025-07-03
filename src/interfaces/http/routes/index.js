const express = require('express');
const router = express.Router();

const userRoutes = require('./v1/user.routes');
const companyRoutes = require('./v1/company.routes');
const authenticationRoutes = require('./v1/authentication.routes');
const redisRoutes = require('./v1/redis.routes');
const emailRoutes = require('./v1/email.routes');


router.use('/users', userRoutes);
router.use('/companies', companyRoutes);
router.use('/authentication', authenticationRoutes);

router.use('/redis', redisRoutes);
router.use('/email', emailRoutes);


module.exports = router;