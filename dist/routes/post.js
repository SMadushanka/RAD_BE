"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middleware/auth");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const router = express_1.default.Router();
// Create post
router.post('/', auth_1.authMiddleware, uploadMiddleware_1.upload.single('image'), postController_1.createPost);
// Get all posts
router.get('/', postController_1.getAllPosts);
// Get user posts
router.get('/user/:userId', postController_1.getUserPosts);
// Get single post
router.get('/:postId', postController_1.getPostById);
// Update post
router.put('/:postId', auth_1.authMiddleware, uploadMiddleware_1.upload.single('image'), postController_1.updatePost);
// Delete post
router.delete('/:postId', auth_1.authMiddleware, postController_1.deletePost);
// Like post
router.post('/:postId/like', auth_1.authMiddleware, postController_1.likePost);
// Add comment
router.post('/:postId/comment', auth_1.authMiddleware, postController_1.addComment);
exports.default = router;
//# sourceMappingURL=post.js.map