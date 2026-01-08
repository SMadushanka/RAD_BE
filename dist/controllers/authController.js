"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.login = exports.register = void 0;
const jwt_1 = require("../config/jwt");
const errorHandler_1 = require("../middleware/errorHandler");
const User_1 = __importDefault(require("../models/User"));
exports.register = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    let { username, email, password, fullName } = req.body;
    // Normalize inputs
    username = (username || '').toString().trim();
    email = (email || '').toString().trim().toLowerCase();
    fullName = (fullName || '').toString().trim();
    // Validation
    if (!username || !email || !password || !fullName) {
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
    // Check if user already exists (use normalized email and username)
    const existingUser = await User_1.default.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'Email or username already exists',
        });
    }
    // Create new user
    const newUser = new User_1.default({
        username,
        email,
        password,
        fullName,
    });
    await newUser.save();
    // Generate token
    const token = (0, jwt_1.generateToken)(newUser._id.toString());
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            fullName: newUser.fullName,
        },
    });
});
exports.login = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required',
        });
    }
    // Find user and select password field
    const user = await User_1.default.findOne({ email }).select('+password');
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
    const token = (0, jwt_1.generateToken)(user._id.toString());
    res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
});
exports.forgotPassword = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required',
        });
    }
    const user = await User_1.default.findOne({ email });
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
//# sourceMappingURL=authController.js.map