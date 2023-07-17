"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.filterBooksByYear = exports.filterBooksByGenre = exports.searchBooks = exports.addNewBook = exports.getBookById = exports.getAllBooks = void 0;
const book_1 = __importDefault(require("../models/book"));
const getAllBooks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.find();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield book_1.default.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getBookById = getBookById;
const addNewBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, publicationDate, image } = req.body;
        const newBook = new book_1.default({
            title,
            author,
            genre,
            publicationDate,
            image, // Store the image URL
        });
        const savedBook = yield newBook.save();
        res.json(savedBook);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.addNewBook = addNewBook;
const searchBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Search books endpoint called'); // Check if the function is being executed
        const searchTerm = ((_a = req.query.searchTerm) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        console.log('Search term:', searchTerm); // Log the search term
        // ... rest of the code ...
        res.json(books);
    }
    catch (error) {
        console.error('Error occurred while searching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.searchBooks = searchBooks;
const filterBooksByGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const genre = ((_b = req.query.genre) === null || _b === void 0 ? void 0 : _b.toString()) || '';
        const books = yield book_1.default.find({ genre });
        res.json(books);
    }
    catch (error) {
        console.error('Error occurred while filtering books by genre:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.filterBooksByGenre = filterBooksByGenre;
const filterBooksByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const year = parseInt(((_c = req.query.year) === null || _c === void 0 ? void 0 : _c.toString()) || '');
        const books = yield book_1.default.find({ publicationYear: year });
        res.json(books);
    }
    catch (error) {
        console.error('Error occurred while filtering books by year:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.filterBooksByYear = filterBooksByYear;
// updateBook API route
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, author, genre, publicationDate, image } = req.body;
        const book = yield book_1.default.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.publicationDate = publicationDate;
        book.image = image; // Set the updated image field
        const updatedBook = yield book.save();
        res.json(updatedBook);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield book_1.default.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteBook = deleteBook;
