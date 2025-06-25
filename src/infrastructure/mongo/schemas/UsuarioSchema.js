const { Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellidoPaterno: { type: String, required: true },
  apellidoMaterno: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date },
  imagen: { type: String },
  inactivo: { type: Boolean, default: false },
});

// Método para comparar contraseña
UsuarioSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = UsuarioSchema;
