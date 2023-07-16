import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  bookId: string;
  content: string;
}

const commentSchema: Schema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  content: { type: String, required: true },
});

export default mongoose.model<Comment>('Comment', commentSchema);
