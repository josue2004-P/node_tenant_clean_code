const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware'); 
const UsuarioController = require('../controllers/UsuarioController');

// POST /api/v1/usuarios
router.post('/', UsuarioController.create);
router.get('/', UsuarioController.getAll);

router.post('/login', UsuarioController.login);
// ✅ Nueva ruta para renovar token
router.get('/renew-token', auth, UsuarioController.renewToken);


module.exports = router;
