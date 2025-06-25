const mongoose = require('mongoose');
const UsuarioSchema = require('./schemas/UsuarioSchema');

module.exports = mongoose.model('Usuario', UsuarioSchema);
