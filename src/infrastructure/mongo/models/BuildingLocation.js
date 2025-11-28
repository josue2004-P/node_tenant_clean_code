const mongoose = require('mongoose');
const BuildingLocationSchema = require('./schemas/BuildingLocationSchema');

module.exports = mongoose.model('BuildingLocation', BuildingLocationSchema);
