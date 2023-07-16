import mongoose, { Types } from 'mongoose';
import { ObjectId } from 'mongoose';

import { Request, Response } from 'express';
import Comment from '../models/commentModel';

import { Types } from 'mongoose';

export const addComment = async (req: Request, res: Response) => {
  const { bookId, comment } = req.body;

  if (!bookId || !comment) {
    return res.status(400).json({ message: 'bookId and comment are required fields' });
  }

  const newComment = new Comment({
    bookId: Types.ObjectId(bookId), // Use Types.ObjectId with the new keyword
    content: comment,
  });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Failed to save comment:', error);
    res.status(500).json({ message: 'Failed to save comment' });
  }
};
  
  

  
  
  
















//   export const addComment = async (req: Request, res: Response) => {
//     const { bookId } = req.params;
//     const { comment } = req.body;
  
//     try {
//       const newComment = new Comment({ bookId, content: comment });
//       await newComment.save();
//       res.status(201).json(newComment);
//     } catch (error) {
//       console.error('Failed to save comment:', error);
//       res.status(500).json({ error: 'Failed to save comment' });
//     }
//   };


// export const getComments = async (req: Request, res: Response) => {
//     const { bookId } = req.params;
//     try {
//         const comments = await Comment.find({ bookId });
//         console.log(comments)
//       res.json(comments);
//     } catch (error) {
//       console.error('Failed to fetch comments:', error);
//       res.status(500).json({ error: 'Failed to fetch comments' });
//     }
//   };

