const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  __id: mongoose.Schema.ObjectId,
  full_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  registered_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);