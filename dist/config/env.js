"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '..', '.env') });
exports.envConfig = {
    PORT: parseInt(process.env.PORT || '5000', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
    BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT || '10', 10),
};
// Lightweight runtime warnings for missing critical configuration
if (!exports.envConfig.MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI is not set. Database connection will fail until configured.');
}
if (!exports.envConfig.JWT_SECRET) {
    console.warn('⚠️  JWT_SECRET is not set. Token generation/verification will fail until configured.');
}
exports.default = exports.envConfig;
//# sourceMappingURL=env.js.map