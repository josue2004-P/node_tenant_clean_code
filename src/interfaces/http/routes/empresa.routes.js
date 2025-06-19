const express = require('express');
const router = express.Router();

const EmpresaController = require('../controllers/EmpresaController');

const jwt = require('../middlewares/auth.middleware');

// POST /api/v1/empresas
router.post('/',jwt, EmpresaController.create);
router.get('/', jwt, EmpresaController.getAll);

module.exports = router;
