import express from 'express';
import {

  addNewBook,
  deleteBook,
  filterBooksByGenre,
  filterBooksByYear,
  getAllBooks,
  getBookById,

  searchBooks,
  updateBook,
} from '../controller/bookController';
import { addComment, getComments } from '../controller/commentController';



const router = express.Router();

// Get all books
router.get('/books', getAllBooks);

// Get a specific book by ID
router.get('/books/:id', getBookById);

// Add a new book
router.post('/books', addNewBook);

// Search books by title, author, or genre
router.get('/books/search', searchBooks);

// Filter books by genre
router.get('/books/genre', filterBooksByGenre);

// Filter books by publication year
router.get('/books/year', filterBooksByYear);

// Update a book by ID
router.put('/books/:id', updateBook);

// Delete a book by ID
router.delete('/books/:id', deleteBook);


// Add a new comment for a book
router.post('/comment/:bookId', addComment);

// Get comments for a book
router.get('/comment/:bookId', getComments);

export default router;
