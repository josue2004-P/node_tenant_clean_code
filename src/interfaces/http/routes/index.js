const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuario.routes');
const empresaRoutes = require('./empresa.routes');

router.use('/usuarios', usuarioRoutes);
router.use('/empresas', empresaRoutes);

module.exports = router;