const Book = require('../models/Book');

// Получить все книги
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении книг' });
  }
};

// Добавить книгу
const addBook = async (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    const book = new Book({ title, author, year });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении книги' });
  }
};

// Обновить книгу
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(id, { title, author, year }, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении книги' });
  }
};

// Удалить книгу
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }
    res.json({ message: 'Книга удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении книги' });
  }
};

// Исправленный экспорт
module.exports = { getBooks, addBook, updateBook, deleteBook };
