const { Schema, Types } = require('mongoose');

const PerfilUsuarioSchema = new Schema({
  usuarioId: { type: Types.ObjectId, ref: 'Usuario' },
  perfilId: { type: Types.ObjectId, ref: 'Perfil' }
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = PerfilUsuarioSchema;
