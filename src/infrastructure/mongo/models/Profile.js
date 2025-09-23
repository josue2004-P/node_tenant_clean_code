const mongoose = require('mongoose');
const ProfileSchema = require('./schemas/ProfileSchema');

module.exports = mongoose.model('Profile', ProfileSchema);
