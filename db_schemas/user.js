// Example: /models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: {type: String, required: true, unique: false},
  Sessions: {
    type: mongoose.Schema.Types.objectID,
    ref: 'Session',
    required: false
  },
  Tag: {
    type: mongoose.Schema.Types.objectID,
    ref: 'Tag',
    required: false
  },
  Summaries: {
    type: mongoose.Schema.Types.objectID,
    ref: 'Sumamry',
    required: false
  },
  Goals: {
    type: mongoose.Schema.Types.objectID,
    ref: 'Goal',
    required: false
  }

});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
