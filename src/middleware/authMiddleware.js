const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Пользователь не найден" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Недействительный токен" });
    }
  } else {
    res.status(401).json({ message: "Токен отсутствует" });
  }
};

// Универсальная проверка ролей
const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Доступ запрещен. Роль не установлена" });
    }

    if (req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: `Доступ запрещен. Требуется роль: ${role}` });
    }
  };
};


module.exports = { protect, checkRole };
