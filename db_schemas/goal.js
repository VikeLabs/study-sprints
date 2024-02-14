
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  UserID: { type: Int, required: true},
  GoalID: { type: Int, required: true, unique: true },
  TagID: { type: Int, required: false},
  TargetDuration: { type: Int, required: true},
  Description: { type: String, required: false}
});

module.exports = mongoose.models.goal || mongoose.model('goal', goalSchema);
