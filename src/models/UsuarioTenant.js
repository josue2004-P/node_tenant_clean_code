// models/UsuarioTenant.js
const { Schema } = require('mongoose');

const UsuarioTenantSchema = new Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' }
}, { timestamps: true });

module.exports = UsuarioTenantSchema;
