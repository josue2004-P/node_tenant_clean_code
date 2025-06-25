const mongoose = require('mongoose');
const EmpresaSchema = require('./schemas/EmpresaSchema');

module.exports = mongoose.model('Empresa', EmpresaSchema);