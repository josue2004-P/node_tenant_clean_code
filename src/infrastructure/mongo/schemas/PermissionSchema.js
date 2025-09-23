const { Schema } = require('mongoose');

const PermissionSchema = new Schema({
  name: { type: String, unique: true, required: true, maxlength: 50 },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

module.exports = PermissionSchema;
