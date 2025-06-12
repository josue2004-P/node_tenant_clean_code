const express = require('express');
const router = express.Router();

// 🔐 Obtener todos los usuarios (admin_db)
router.get('/', async (req, res) => {
  try {
    const usuarios = await req.Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// ➕ Crear nuevo usuario
router.post('/', async (req, res) => {
  try {
    const usuario = await req.Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// 🔍 Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await req.Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
});

// ✏️ Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = await req.Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// 🗑️ Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await req.Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
