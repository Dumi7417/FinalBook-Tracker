const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("Полученный токен:", token);  // 🔥 Логируем токен

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Расшифрованный токен:", decoded); // 🔥 Логируем данные из токена

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Пользователь не найден" });
      }

      next();
    } catch (error) {
      console.error("Ошибка проверки токена:", error.message);
      return res.status(401).json({ message: "Недействительный токен" });
    }
  } else {
    return res.status(401).json({ message: "Токен отсутствует" });
  }
};


// Универсальная проверка ролей (исправленная)
const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "Доступ запрещен. Пользователь не найден" });
    }

    // Проверяем флаг isAdmin, а не req.user.role
    if (role === "admin" && req.user.isAdmin) {
      return next();
    }

    return res.status(403).json({ message: `Доступ запрещен. Требуется роль: ${role}` });
  };
};


module.exports = { protect, checkRole };
