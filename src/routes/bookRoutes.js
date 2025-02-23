const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/authMiddleware');
const adminOnly = checkRole("admin"); // Создаем adminOnly с помощью checkRole

// Импортируем контроллеры
const controllers = require('../controllers/bookController');

console.log('Контроллеры:', controllers); // Логируем, что импортируется

// Деструктурируем функции
const { getBooks, addBook, updateBook, deleteBook } = controllers;

// Проверяем, что функции определены
console.log('getBooks:', getBooks);
console.log('addBook:', addBook);
console.log('updateBook:', updateBook);
console.log('deleteBook:', deleteBook);

// Получить все книги (доступно всем)
router.get('/', getBooks);

// Добавить книгу (только администратор)
router.post('/', protect, adminOnly, addBook);

// Обновить книгу (только администратор)
router.put('/:id', protect, adminOnly, updateBook);

// Удалить книгу (только администратор)
router.delete('/:id', protect, adminOnly, deleteBook);

module.exports = router;
