import express from 'express';
import {
  addComment,
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getUserPosts,
  likePost,
  updatePost,
} from '../controllers/postController';
import { authMiddleware } from '../middleware/auth';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

// Create post
router.post('/', authMiddleware, upload.single('image'), createPost);

// Get all posts
router.get('/', getAllPosts);

// Get user posts
router.get('/user/:userId', getUserPosts);

// Get single post
router.get('/:postId', getPostById);

// Update post
router.put('/:postId', authMiddleware, upload.single('image'), updatePost);

// Delete post
router.delete('/:postId', authMiddleware, deletePost);

// Like post
router.post('/:postId/like', authMiddleware, likePost);

// Add comment
router.post('/:postId/comment', authMiddleware, addComment);

export default router;
