const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  safety: { type: Number, required: true },
  emotion: { type: String, required: true },
  situation: { type: String, required: true },
  perpetrator: { type: String, required: true },
  companion: { type: Boolean, required: true },
  caseClosed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('User', userSchema);
