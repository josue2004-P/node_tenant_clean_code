const mongoose = require('mongoose');

const PerfilSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date }
}, { collection: 'perfiles' });

module.exports = mongoose.model('Perfil', PerfilSchema);