"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const router = express_1.default.Router();
// Get user profile
router.get('/profile', auth_1.authMiddleware, userController_1.getUserProfile);
// Update user profile
router.put('/profile', auth_1.authMiddleware, userController_1.updateUserProfile);
// Upload profile photo
router.post('/upload-photo', auth_1.authMiddleware, uploadMiddleware_1.upload.single('photo'), userController_1.uploadProfilePhoto);
// Get all users (sellers)
router.get('/all', userController_1.getAllUsers);
// Get user by ID
router.get('/:userId', userController_1.getUserById);
exports.default = router;
//# sourceMappingURL=user.js.map