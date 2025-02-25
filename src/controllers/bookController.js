const Book = require('../models/Book');

// Получить все книги
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('❌ Ошибка при получении книг:', error);
    res.status(500).json({ message: 'Ошибка при получении книг' });
  }
};

// Добавить книгу
const addBook = async (req, res) => {
  console.log('📩 Данные запроса:', req.body); // Логируем входные данные
  console.log('🔐 Пользователь:', req.user); // Логируем пользователя

  const { title, author, description } = req.body;
  if (!title || !author || !description) {
    console.warn('⚠️ Ошибка: не все поля заполнены');
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    const book = new Book({ title, author, description });
    await book.save();
    console.log('✅ Книга добавлена:', book);
    res.status(201).json(book);
  } catch (error) {
    console.error('❌ Ошибка при добавлении книги:', error);
    res.status(500).json({ message: 'Ошибка при добавлении книги' });
  }
};

// Обновить книгу
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description } = req.body;

  console.log(`🔄 Запрос на обновление книги (ID: ${id}):`, req.body);

  try {
    const book = await Book.findByIdAndUpdate(id, { title, author, description }, { new: true });
    if (!book) {
      console.warn(`⚠️ Книга с ID ${id} не найдена`);
      return res.status(404).json({ message: 'Книга не найдена' });
    }
    console.log('✅ Книга обновлена:', book);
    res.json(book);
  } catch (error) {
    console.error('❌ Ошибка при обновлении книги:', error);
    res.status(500).json({ message: 'Ошибка при обновлении книги' });
  }
};

// Удалить книгу
const deleteBook = async (req, res) => {
  const { id } = req.params;
  
  console.log(`🗑 Запрос на удаление книги (ID: ${id})`);

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      console.warn(`⚠️ Книга с ID ${id} не найдена`);
      return res.status(404).json({ message: 'Книга не найдена' });
    }
    console.log('✅ Книга удалена:', book);
    res.json({ message: 'Книга удалена' });
  } catch (error) {
    console.error('❌ Ошибка при удалении книги:', error);
    res.status(500).json({ message: 'Ошибка при удалении книги' });
  }
};

module.exports = { getBooks, addBook, updateBook, deleteBook };
