"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
const connectDB = async () => {
    const uri = env_1.default.MONGODB_URI;
    if (!uri) {
        console.error('❌ MONGODB_URI is not configured. Set it in .env and restart the server.');
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(uri, {
            // useNewUrlParser/useUnifiedTopology are no-ops in newer mongoose versions,
            // but providing options keeps backward compatibility for older installs.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            useNewUrlParser: true,
            // @ts-ignore
            useUnifiedTopology: true,
        });
        console.log('✅ Database connected successfully');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
exports.default = exports.connectDB;
//# sourceMappingURL=database.js.map