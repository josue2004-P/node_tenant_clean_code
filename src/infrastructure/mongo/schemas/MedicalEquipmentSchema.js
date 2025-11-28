const { Schema } = require('mongoose');

const MedicalEquipmentSchema = new Schema({
  name: { type: String, required: true, trim: true },
  model: { type: String, trim: true },
  serialNumber: { type: String, unique: true, sparse: true, trim: true },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'maintenance'], 
    default: 'active' 
  },
  purchaseDate: { type: Date },
  lastMaintenance: { type: Date },
  locationId: { type: Schema.Types.ObjectId, ref: 'BuildingLocation', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

module.exports = MedicalEquipmentSchema;
