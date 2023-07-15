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

