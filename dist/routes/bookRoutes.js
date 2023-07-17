"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const commentController_1 = require("../controller/commentController");
const router = express_1.default.Router();
// Get all books
router.get('/books', bookController_1.getAllBooks);
// Get a specific book by ID
router.get('/books/:id', bookController_1.getBookById);
// Add a new book
router.post('/books', bookController_1.addNewBook);
// Search books by title, author, or genre
router.get('/books/search', bookController_1.searchBooks);
// Filter books by genre
router.get('/books/genre', bookController_1.filterBooksByGenre);
// Filter books by publication year
router.get('/books/year', bookController_1.filterBooksByYear);
// Update a book by ID
router.put('/books/:id', bookController_1.updateBook);
// Delete a book by ID
router.delete('/books/:id', bookController_1.deleteBook);
// Add a new comment for a book
router.post('/comment/:bookId', commentController_1.addComment);
// Get comments for a book
router.get('/comment/:bookId', commentController_1.getComments);
exports.default = router;
