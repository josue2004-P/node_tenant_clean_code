const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuario.routes');
const empresaRoutes = require('./empresa.routes');
const authRoutes = require('./auth.routes');
const redisRoutes = require('./redis.routes');

router.use('/usuarios', usuarioRoutes);
router.use('/empresas', empresaRoutes);
router.use('/auth', authRoutes);

router.use('/redis', redisRoutes);

module.exports = router;