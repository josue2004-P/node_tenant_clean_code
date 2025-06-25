const { Schema } = require('mongoose');

const EmpresaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
    trim: true,
  },
  razonSocial: {
    type: String,
    required: [true, 'La razón social es obligatoria'],
    trim: true,
  },
  databaseName: {
    type: String,
    required: [true, 'El nombre de la base de datos es obligatorio'],
    trim: true,
  },
  estatus: {
    type: String,
    enum: ['activa', 'inactiva'],
    default: 'activa',
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = EmpresaSchema;
