import express from 'express';
import {
    getAllUsers,
    getUserById,
    getUserProfile,
    updateUserProfile,
    uploadProfilePhoto,
} from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

// Upload profile photo
router.post('/upload-photo', authMiddleware, upload.single('photo'), uploadProfilePhoto);

// Get all users (sellers)
router.get('/all', getAllUsers);

// Get user by ID
router.get('/:userId', getUserById);

export default router;
