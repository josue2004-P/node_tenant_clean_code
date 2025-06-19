const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

// POST /api/v1/usuarios
router.post('/', UsuarioController.create);

module.exports = router;
