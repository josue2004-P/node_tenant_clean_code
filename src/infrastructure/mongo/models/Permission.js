const mongoose = require('mongoose');
const PermissionSchema = require('./schemas/PermissionSchema');

module.exports = mongoose.model('Permission', PermissionSchema);
