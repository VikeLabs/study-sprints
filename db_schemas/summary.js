// Example: /models/User.js
const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  Period: { type: String, required: true },
  TotalTimeWorked: { type: Float, required: false},
  TagTimeWorked: { type: Float, required: false},
  AvgStartTime: { type: String, required: false},
  AvgEndTime: { type: String, required: false},

});

module.exports = mongoose.models.summary || mongoose.model('Summary', userSchema);
