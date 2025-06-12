const { Schema, Types } = require('mongoose');

const UsuarioSchema = new Schema({
  nombre: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  usuario: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  imagenUsuario: String,
  activo: { type: Boolean, default: true },
  perfiles: [{ type: Types.ObjectId, ref: 'PerfilUsuario' }]
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = UsuarioSchema;
