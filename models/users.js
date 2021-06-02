let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;
