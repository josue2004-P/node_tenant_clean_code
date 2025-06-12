const express = require('express');
const router = express.Router();

// Obtener todas las empresas
router.get('/', async (req, res) => {
  try {
    const empresas = await req.Empresa.find(); // Usa el modelo conectado desde el middleware
    res.json(empresas);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    res.status(500).json({ error: 'Error al obtener empresas' });
  }
});

// Registrar una nueva empresgita (opcional)
router.post('/', async (req, res) => {
  try {
    const empresa = await req.Empresa.create(req.body);
    res.status(201).json(empresa);
  } catch (error) {
    console.error('Error al crear empresa:', error);
    res.status(500).json({ error: 'Error al crear empresa' });
  }
});

module.exports = router;
