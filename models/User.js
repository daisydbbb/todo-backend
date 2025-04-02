const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, requried: true },
  email: { type: String, requried: true, unique: true },
  password: { type: String, requried: true },
});

module.exports = mongoose.model("User", UserSchema);
