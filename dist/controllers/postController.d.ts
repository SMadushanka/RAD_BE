import type { Response } from 'express';
export declare const createPost: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
export declare const getAllPosts: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
export declare const getUserPosts: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
export declare const getPostById: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
export declare const updatePost: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
export declare const deletePost: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
export declare const likePost: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
export declare const addComment: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
