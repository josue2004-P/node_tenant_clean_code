// models/Empresa.js
const { Schema } = require('mongoose');

const EmpresaSchema = new Schema({
  nombre: { type: String, required: true, unique: true },         // nombre corto, ej. "empresa1"
  razonSocial: { type: String },                                   // nombre legal completo
  databaseName: { type: String, required: true },                  // ej. tenant_empresa1
  estatus: { type: String, default: 'activa', enum: ['activa', 'inactiva'] },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = EmpresaSchema;