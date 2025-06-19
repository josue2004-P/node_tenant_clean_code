const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuario.routes');
const empresaRoutes = require('./empresa.routes');
const authRoutes = require('./auth.routes');


router.use('/usuarios', usuarioRoutes);
router.use('/empresas', empresaRoutes);
router.use('/auth', authRoutes);


module.exports = router;