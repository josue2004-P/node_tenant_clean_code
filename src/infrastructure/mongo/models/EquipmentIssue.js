const mongoose = require('mongoose');
const EquipmentIssueSchema = require('./schemas/EquipmentIssueSchema');

module.exports = mongoose.model('EquipmentIssue', EquipmentIssueSchema);
