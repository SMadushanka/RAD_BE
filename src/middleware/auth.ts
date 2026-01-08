import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../config/jwt';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  file?: any; // Multer file type
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Support multiple token locations to make clients more robust
    const authHeader = (req.headers.authorization as string) || (req.headers['x-access-token'] as string) || undefined;

    // If header not present, check query param or cookies (useful for non-header clients)
    const queryToken = (req.query && (req.query.token as string)) || undefined;
    const cookieToken = (req as any).cookies?.token;

    let token: string | undefined = undefined;

    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
        token = parts[1];
      } else if (parts.length === 1) {
        token = parts[0];
      }
    }

    token = token || queryToken || cookieToken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided in Authorization header, x-access-token header, query param, or cookie' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    req.userId = (decoded as any).userId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

export default authMiddleware;
