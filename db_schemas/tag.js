// Example: /models/User.js
const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false},
});

module.exports = mongoose.models.tag || mongoose.model('tag', tagSchema);
