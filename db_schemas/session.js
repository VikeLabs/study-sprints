// Example: /models/User.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  Duration: { type: Float, required: false},
  StartTime: { type: String, required: false},
  EndTime: { type: String, required: false},
  Tag: {
    type: mongoose.Schema.Types.objectID,
    ref: 'Tag',
    required: false
  }
});

module.exports = mongoose.models.session || mongoose.model('session', userSchema);
