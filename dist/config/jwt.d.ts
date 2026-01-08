export declare const generateToken: (userId: string) => string;
export interface JwtPayload {
    userId?: string;
    iat?: number;
    exp?: number;
    [key: string]: any;
}
export declare const verifyToken: (token: string) => JwtPayload | null;
export declare const decodeToken: (token: string) => JwtPayload | null;
