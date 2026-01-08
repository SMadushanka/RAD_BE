"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../config/jwt");
const authMiddleware = (req, res, next) => {
    try {
        // Support multiple token locations to make clients more robust
        const authHeader = req.headers.authorization || req.headers['x-access-token'] || undefined;
        // If header not present, check query param or cookies (useful for non-header clients)
        const queryToken = (req.query && req.query.token) || undefined;
        const cookieToken = req.cookies?.token;
        let token = undefined;
        if (authHeader) {
            const parts = authHeader.split(' ');
            if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
                token = parts[1];
            }
            else if (parts.length === 1) {
                token = parts[0];
            }
        }
        token = token || queryToken || cookieToken;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided in Authorization header, x-access-token header, query param, or cookie' });
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
//# sourceMappingURL=auth.js.map