const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect, checkRole } = require("../middleware/authMiddleware");
const User = require("../models/User"); 

// Регистрация и логин
router.post("/register", registerUser);
console.log("Маршрут /api/users/login зарегистрирован");
console.log("POST /api/users/login вызван");
router.post("/login", loginUser);

// Получение и обновление профиля (только для авторизованных пользователей)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

// Только администратор может получать список всех пользователей
router.get("/", protect, checkRole("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении пользователей" });
  }
});

module.exports = router;
