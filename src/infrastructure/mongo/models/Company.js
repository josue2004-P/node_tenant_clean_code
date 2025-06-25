const mongoose = require('mongoose');
const CompanySchema = require('./schemas/CompanySchema');

module.exports = mongoose.model('Company', CompanySchema);
