const mongoose = require('mongoose');

const PerfilPermisoSchema = new mongoose.Schema({
  permiso: { type: mongoose.Schema.Types.ObjectId, ref: 'Permiso', required: true },
  perfil: { type: mongoose.Schema.Types.ObjectId, ref: 'Perfil', required: true },
  leer: { type: Boolean, default: false },
  crear: { type: Boolean, default: false },
  editar: { type: Boolean, default: false },
  borrar: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date }
}, { collection: 'perfiles_permisos' });

module.exports = mongoose.model('PerfilPermiso', PerfilPermisoSchema);
