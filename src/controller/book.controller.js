const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailService = require("../utils/emailService.js");
const Book = require("../models/book.models");




 const createBook = async (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        if (!title || !author || !year || !genre) {
        return res.status(400).json ({message: 'All fields are required.'});
    }
   const newBook = new Book ({
    title,
    author,
    year,
    genre,
   });
   await newBook.save();
   return res.status(201).json(newBook);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error"});
    }
};


// Get all books
    const getAllBooks =async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
        
    }
};


// Get a book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: 'Book not found' });

        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// Update a book
const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBook)
            return res.status(404).json({ message: 'Book not found' });

        return res.json(updatedBook);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook)
            return res.status(404).json({ message: 'Book not found' });
        return res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };