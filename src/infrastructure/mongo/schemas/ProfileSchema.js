const { Schema } = require('mongoose');
const mongoose = require("mongoose");

const ProfileSchema = new Schema({
  name: { type: String, required: true, unique: true, maxlength: 50 },
  description: { type: String },

  permissions: [
    {
      permission_id: { type: mongoose.Schema.Types.ObjectId, ref: "Permission", required: true },
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    }
  ],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

module.exports = ProfileSchema;
