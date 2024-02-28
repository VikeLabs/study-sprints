// Example: /models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: { type: Int, required: true, unique: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true, unique: false},
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
