const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Relación con perfiles (un usuario puede tener varios perfiles)
  profiles: [{
     type: mongoose.Schema.Types.ObjectId, ref: "Profile"
  }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  avatar: { type: String },
  isInactive: { type: Boolean, default: false },
});

// Password comparison method
UserSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = UserSchema;
