import type { NextFunction, Request, Response } from 'express';
export interface AuthenticatedRequest extends Request {
    userId?: string;
    file?: any;
}
export declare const authMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleware;
