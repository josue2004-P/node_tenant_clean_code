const { Schema, Types } = require('mongoose');

const PermisoSchema = new Schema({
  nombre: { type: String, unique: true },
  descripcion: String,
  perfiles: [{ type: Types.ObjectId, ref: 'PerfilPermiso' }]
}, { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } });

module.exports = PermisoSchema;
