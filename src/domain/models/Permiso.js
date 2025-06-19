const mongoose = require('mongoose');

const PermisoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date }
}, { collection: 'permisos' });

module.exports = mongoose.model('Permiso', PermisoSchema);
