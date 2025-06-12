// models/Usuario.js
const { Schema } = require('mongoose');

const UsuarioSchema = new Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
  empresa: { type: String }, // nombre corto de la empresa (opcional)
}, { timestamps: true });

module.exports = UsuarioSchema;