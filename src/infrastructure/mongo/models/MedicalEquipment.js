const mongoose = require('mongoose');
const MedicalEquipmentSchema = require('./schemas/MedicalEquipmentSchema');

module.exports = mongoose.model('MedicalEquipment', MedicalEquipmentSchema);
