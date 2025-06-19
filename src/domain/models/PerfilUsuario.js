const mongoose = require('mongoose');

const PerfilUsuarioSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  perfil: { type: mongoose.Schema.Types.ObjectId, ref: 'Perfil', required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date }
}, { collection: 'perfiles_usuarios' });

module.exports = mongoose.model('PerfilUsuario', PerfilUsuarioSchema);
