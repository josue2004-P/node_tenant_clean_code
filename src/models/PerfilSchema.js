const { Schema, Types } = require('mongoose');

const PerfilSchema = new Schema({
  nombre: { type: String, unique: true },
  descripcion: String,
  usuarios: [{ type: Types.ObjectId, ref: 'PerfilUsuario' }],
  permisos: [{ type: Types.ObjectId, ref: 'PerfilPermiso' }]
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = PerfilSchema;
