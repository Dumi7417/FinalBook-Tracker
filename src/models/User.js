const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Роль пользователя
  isAdmin: { type: Boolean, required: true, default: false } // Флаг администратора
});


const User = mongoose.model("User", UserSchema);
module.exports = User;
