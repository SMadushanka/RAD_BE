import type { Request, Response } from 'express';
import { generateToken } from '../config/jwt';
import { asyncHandler } from '../middleware/errorHandler';
import User from '../models/User';

export const register = asyncHandler(async (req: Request, res: Response) => {
  let { email, password, fullName } = req.body;

  // Normalize inputs
  email = (email || '').toString().trim().toLowerCase();
  fullName = (fullName || '').toString().trim();

  // Validation
  if (!email || !password || !fullName) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long',
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists',
    });
  }

  // Create new user
  const newUser = new User({
    email,
    password,
    fullName,
  });

  await newUser.save();

  // Generate token
  const token = generateToken(newUser._id.toString());

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  // Find user and select password field
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) { 
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Generate token
  const token = generateToken(user._id.toString());

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  // TODO: Send password reset email
  res.json({
    success: true,
    message: 'Password reset link sent to your email',
  });
});
