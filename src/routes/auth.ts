import express from 'express';
import { forgotPassword, login, register } from '../controllers/authController';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Forgot Password
router.post('/forgot-password', forgotPassword);

export default router;
