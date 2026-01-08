"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.likePost = exports.deletePost = exports.updatePost = exports.getPostById = exports.getUserPosts = exports.getAllPosts = exports.createPost = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_1 = require("../middleware/errorHandler");
const Post_1 = __importDefault(require("../models/Post"));
exports.createPost = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { title, description, price, category, condition, location } = req.body;
    let image = req.body.image;
    if (req.file) {
        image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    if (!title || !description || !price || !category || !location) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }
    const newPost = new Post_1.default({
        title,
        description,
        price,
        category,
        condition,
        location,
        image,
        author: req.userId,
    });
    await newPost.save();
    await newPost.populate('author', 'username fullName profileImage phone');
    res.status(201).json({
        success: true,
        message: 'Post created successfully',
        post: newPost,
    });
});
exports.getAllPosts = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const posts = await Post_1.default.find()
        .populate('author', 'username fullName profileImage phone')
        .populate('comments.user', 'username fullName profileImage')
        .sort({ createdAt: -1 });
    res.json({
        success: true,
        count: posts.length,
        posts,
    });
});
exports.getUserPosts = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const posts = await Post_1.default.find({ author: req.params.userId })
        .populate('author', 'username fullName profileImage phone')
        .populate('comments.user', 'username fullName profileImage')
        .sort({ createdAt: -1 });
    res.json({
        success: true,
        count: posts.length,
        posts,
    });
});
exports.getPostById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const post = await Post_1.default.findById(req.params.postId)
        .populate('author', 'username fullName profileImage phone')
        .populate('comments.user', 'username fullName profileImage');
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }
    res.json({
        success: true,
        post,
    });
});
exports.updatePost = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { title, description, price, category, condition, location } = req.body;
    let image = req.body.image;
    if (req.file) {
        image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    const post = await Post_1.default.findById(req.params.postId);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }
    if (post.author.toString() !== req.userId) {
        return res.status(403).json({
            success: false,
            message: 'Not authorized to update this post',
        });
    }
    const updatedPost = await Post_1.default.findByIdAndUpdate(req.params.postId, { title, description, image, price, category, condition, location }, { new: true, runValidators: true })
        .populate('author', 'username fullName profileImage phone')
        .populate('comments.user', 'username fullName profileImage');
    res.json({
        success: true,
        message: 'Post updated successfully',
        post: updatedPost,
    });
});
exports.deletePost = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const post = await Post_1.default.findById(req.params.postId);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }
    if (post.author.toString() !== req.userId) {
        return res.status(403).json({
            success: false,
            message: 'Not authorized to delete this post',
        });
    }
    await Post_1.default.findByIdAndDelete(req.params.postId);
    res.json({
        success: true,
        message: 'Post deleted successfully',
    });
});
exports.likePost = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const post = await Post_1.default.findById(req.params.postId);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }
    const userId = new mongoose_1.default.Types.ObjectId(req.userId);
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
        post.likes = post.likes.filter((id) => !id.equals(userId));
    }
    else {
        post.likes.push(userId);
    }
    await post.save();
    await post.populate('author', 'username fullName profileImage phone');
    await post.populate('comments.user', 'username fullName profileImage');
    res.json({
        success: true,
        message: isLiked ? 'Post unliked' : 'Post liked',
        post,
    });
});
exports.addComment = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({
            success: false,
            message: 'Comment text is required',
        });
    }
    const post = await Post_1.default.findById(req.params.postId);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }
    post.comments.push({
        user: new mongoose_1.default.Types.ObjectId(req.userId),
        text,
        createdAt: new Date(),
    });
    await post.save();
    await post.populate('author', 'username fullName profileImage phone');
    await post.populate('comments.user', 'username fullName profileImage');
    res.json({
        success: true,
        message: 'Comment added successfully',
        post,
    });
});
//# sourceMappingURL=postController.js.map