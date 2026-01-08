"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("./env"));
const JWT_SECRET = env_1.default.JWT_SECRET;
const JWT_EXPIRE = env_1.default.JWT_EXPIRE;
if (!JWT_SECRET) {
    // fail fast: token operations will not work without a secret
    console.error('❌ JWT_SECRET is not configured in env. Exiting.');
    process.exit(1);
}
const generateToken = (userId) => {
    const options = {
        expiresIn: JWT_EXPIRE,
    };
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, options);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (typeof decoded === 'string') {
            // unexpected string payload — convert to object for consistency
            return { userId: decoded };
        }
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const decodeToken = (token) => {
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded)
        return null;
    return decoded || null;
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map