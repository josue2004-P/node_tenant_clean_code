const { Schema } = require('mongoose');

const CompanySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  databaseName: {
    type: String,
    required: [true, 'Database name is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = CompanySchema;
