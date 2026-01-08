import type { Response } from 'express';
import mongoose from 'mongoose';
import type { AuthenticatedRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import Post from '../models/Post';

export const createPost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
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

    const newPost = new Post({
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

export const getAllPosts = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const posts = await Post.find()
        .populate('author', 'username fullName profileImage phone')
        .populate('comments.user', 'username fullName profileImage')
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        count: posts.length,
        posts,
    });
});

export const getUserPosts = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const posts = await Post.find({ author: req.params.userId })
        .populate('author', 'username fullName profileImage phone')
        .populate('comments.user', 'username fullName profileImage')
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        count: posts.length,
        posts,
    });
});

export const getPostById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const post = await Post.findById(req.params.postId)
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

export const updatePost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, price, category, condition, location } = req.body;
    let image = req.body.image;

    if (req.file) {
        image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const post = await Post.findById(req.params.postId);

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

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        { title, description, image, price, category, condition, location },
        { new: true, runValidators: true }
    )
        .populate('author', 'username fullName profileImage phone')
        .populate('comments.user', 'username fullName profileImage');

    res.json({
        success: true,
        message: 'Post updated successfully',
        post: updatedPost,
    });
});

export const deletePost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const post = await Post.findById(req.params.postId);

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

    await Post.findByIdAndDelete(req.params.postId);

    res.json({
        success: true,
        message: 'Post deleted successfully',
    });
});

export const likePost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }

    const userId = new mongoose.Types.ObjectId(req.userId);
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
        post.likes = post.likes.filter((id) => !id.equals(userId));
    } else {
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

export const addComment = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            success: false,
            message: 'Comment text is required',
        });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }

    post.comments.push({
        user: new mongoose.Types.ObjectId(req.userId),
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
