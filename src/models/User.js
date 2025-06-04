const { Schema } = require('mongoose');

const UserSchema = new Schema({
  name: String,
  email: String,
}, { timestamps: true });

module.exports = UserSchema;
