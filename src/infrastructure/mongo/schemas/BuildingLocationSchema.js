const { Schema } = require('mongoose');

const BuildingLocationSchema = new Schema({
  floor: { type: Number, required: true },
  room: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

module.exports = BuildingLocationSchema;
