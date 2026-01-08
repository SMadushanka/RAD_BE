import jwt, { SignOptions } from 'jsonwebtoken';
import envConfig from './env';

const JWT_SECRET = envConfig.JWT_SECRET;
const JWT_EXPIRE = envConfig.JWT_EXPIRE;

if (!JWT_SECRET) {
  // fail fast: token operations will not work without a secret
  console.error('❌ JWT_SECRET is not configured in env. Exiting.');
  process.exit(1);
}

export const generateToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRE as any,
  };
  return jwt.sign({ userId }, JWT_SECRET, options);
};

export interface JwtPayload {
  userId?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string') {
      // unexpected string payload — convert to object for consistency
      return { userId: decoded };
    }
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string): JwtPayload | null => {
  const decoded = jwt.decode(token);
  if (!decoded) return null;
  return (decoded as JwtPayload) || null;
};
