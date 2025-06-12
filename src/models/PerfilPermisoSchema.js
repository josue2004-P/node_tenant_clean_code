const { Schema, Types } = require('mongoose');

const PerfilPermisoSchema = new Schema({
  permisoId: { type: Types.ObjectId, ref: 'Permiso' },
  perfilId: { type: Types.ObjectId, ref: 'Perfil' },
  puedeLeer: { type: Boolean, default: false },
  puedeCrear: { type: Boolean, default: false },
  puedeEditar: { type: Boolean, default: false },
  puedeBorrar: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = PerfilPermisoSchema;
