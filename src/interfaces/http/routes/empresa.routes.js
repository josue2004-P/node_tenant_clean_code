const express = require('express');
const router = express.Router();

const EmpresaController = require('../controllers/EmpresaController');

// POST /api/v1/empresas
router.post('/', EmpresaController.create);
router.get('/', EmpresaController.getAll);

module.exports = router;
