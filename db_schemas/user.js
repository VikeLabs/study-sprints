// Example: /models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add other fields as needed
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
