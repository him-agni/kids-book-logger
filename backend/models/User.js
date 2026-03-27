const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  age: { type: Number },
  displayName: { type: String },
  preferences: [{ type: String }] // e.g., "magic", "animals", "space"
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
