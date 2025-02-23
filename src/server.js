require('dotenv').config(); // ✅ Загружаем переменные окружения

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db"); // Подключение к MongoDB
console.log("MONGODB_URI:", process.env.MONGODB_URI);
connectDB();

console.log("Значение JWT_SECRET из .env:", process.env.JWT_SECRET);

const app = express();
app.use(express.json());

// Подключаем маршруты
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
console.log("Маршрут /api/users подключается...");
app.use("/api/users", userRoutes); // ✅ Здесь должны подключаться маршруты пользователей
console.log("Маршрут /api/users подключен");

// Логируем, что маршруты загружены
console.log("Маршруты загружены: /api/auth, /api/books, /api/users");

app.get("/", (req, res) => {
  res.send("API is running...");
});

console.log("MONGODB_URI:", process.env.MONGODB_URI);

// MongoDB подключение
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
