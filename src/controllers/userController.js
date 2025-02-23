const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

// Регистрация пользователя
// Регистрация пользователя
const registerUser = async (req, res) => {
  try {
    console.log("📩 Получен запрос на регистрацию:", req.body); // Логируем входящие данные

    const { username, email, password, role } = req.body; 
    const userRole = role || "user"; // Роль по умолчанию - "user"

    if (!username || !email || !password) {
      console.log("❌ Ошибка: Одно из полей пустое");
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("⚠️ Пользователь с таким email уже существует:", email);
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Захешированный пароль:", hashedPassword);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: userRole, 
    });

    await user.save();
    console.log("🎉 Создан пользователь:", user);

    res.status(201).json({ message: "Регистрация успешна!" });
  } catch (error) {
    console.error("🔥 Ошибка сервера:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};



// Авторизация пользователя (логин)
const loginUser = async (req, res) => {
  console.log("Логин вызван");
  
  try {
    console.log("Запрос на логин:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Введите email и пароль" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Пользователь не найден");
      return res.status(401).json({ message: "Неверные учетные данные" });
    }

    console.log("✅ Пользователь найден:", user.email);
    console.log("🔍 Захешированный пароль в базе:", user.password);
    console.log("🔍 Введенный пароль:", password);

    // Сравниваем пароли
    const isMatch = await bcrypt.compare(password, user.password);
    
    
    
    console.log("🛠 Результат сравнения паролей:", isMatch);

    if (!isMatch) {
      console.log("❌ Неверный пароль");
      return res.status(401).json({ message: "Неверные учетные данные" });
    }

    console.log("✅ Пароль верный, создаем токен...");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    console.log("✅ Токен создан:", token);

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,  // Добавляем роль
      token,
    });
    
  } catch (error) {
    console.error("❌ Ошибка сервера:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};


// Получение профиля пользователя
const getUserProfile = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Некорректный ID пользователя" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Обновление профиля
const updateUserProfile = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Некорректный ID пользователя" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({ message: "Пароль должен содержать минимум 6 символов" });
      }
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
console.log("Экспортируем:", { registerUser, loginUser, getUserProfile, updateUserProfile });
module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
