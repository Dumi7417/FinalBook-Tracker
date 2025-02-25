const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/authMiddleware');
const adminOnly = checkRole("admin");
const { getBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');

router.get('/', getBooks);
router.post('/', protect, adminOnly, (req, res, next) => {
    console.log("Запрос на добавление книги:", req.body);
    next();
}, addBook);
router.put('/:id', protect, adminOnly, updateBook);
router.delete('/:id', protect, adminOnly, deleteBook);

module.exports = router;
