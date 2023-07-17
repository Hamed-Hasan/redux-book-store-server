"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getComments = exports.addComment = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, comment } = req.body;
    if (!bookId || !comment) {
        return res.status(400).json({ message: 'bookId and comment are required fields' });
    }
    const newComment = new commentModel_1.default({
        bookId: mongoose_1.Types.ObjectId(bookId),
        content: comment,
    });
    try {
        const savedComment = yield newComment.save();
        res.status(201).json(savedComment);
    }
    catch (error) {
        console.error('Failed to save comment:', error);
        res.status(500).json({ message: 'Failed to save comment' });
    }
});
exports.addComment = addComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    console.log(bookId);
    try {
        let query = {};
        if (mongoose_1.default.Types.ObjectId.isValid(bookId)) {
            query = { bookId: new mongoose_1.default.Types.ObjectId(bookId) };
        }
        const comments = yield commentModel_1.default.find(query);
        console.log(comments);
        res.json(comments);
    }
    catch (error) {
        console.error('Failed to fetch comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});
exports.getComments = getComments;
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
