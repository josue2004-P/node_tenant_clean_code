const { Schema } = require('mongoose');

const EquipmentIssueSchema = new Schema({
  equipmentId: { type: Schema.Types.ObjectId, ref: 'MedicalEquipment', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  severity: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'critical'], 
    default: 'low' 
  },
  status: { 
    type: String, 
    enum: ['open', 'in_progress', 'resolved', 'closed'], 
    default: 'open' 
  },
  reportedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

module.exports = EquipmentIssueSchema;
