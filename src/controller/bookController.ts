import { Request, Response } from 'express';
import Book, { IBook } from '../models/book';

export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addNewBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, publicationDate } = req.body;
    const newBook: IBook = new Book({
      title,
      author,
      genre,
      publicationDate,
    });
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchBooks = async (req, res) => {
  try {
    console.log('Search books endpoint called'); // Check if the function is being executed
    const searchTerm = req.query.searchTerm?.toString() || '';
    console.log('Search term:', searchTerm); // Log the search term
    // ... rest of the code ...
    res.json(books);
  } catch (error) {
    console.error('Error occurred while searching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const filterBooksByGenre = async (req, res) => {
  try {
    const genre = req.query.genre?.toString() || '';
    const books = await Book.find({ genre });
    res.json(books);
  } catch (error) {
    console.error('Error occurred while filtering books by genre:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const filterBooksByYear = async (req, res) => {
  try {
    const year = parseInt(req.query.year?.toString() || '');
    const books = await Book.find({ publicationYear: year });
    res.json(books);
  } catch (error) {
    console.error('Error occurred while filtering books by year:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// updateBook API route
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, publicationDate } = req.body;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.publicationDate = publicationDate;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
