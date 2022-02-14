const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true, lowercase: true },
});

module.exports = mongoose.model('Admin', adminSchema);
