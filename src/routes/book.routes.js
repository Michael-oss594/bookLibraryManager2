const express = require('express');
const {createBook, getAllBooks, getBookById, updateBook, deleteBook} = require('../controller/book.controller');
const isAuth = require('../config/auth');
const router = express.Router();


router.post('/create-book', isAuth, createBook);
router.get('/books', isAuth, getAllBooks);
router.get('/books/:id', isAuth, getBookById);
router.patch('/books/:id', isAuth, updateBook);
router.delete('/books/:id', isAuth, deleteBook);
module.exports = router;