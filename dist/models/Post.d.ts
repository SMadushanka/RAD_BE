import mongoose, { Document } from 'mongoose';
export interface IPost extends Document {
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    location: string;
    image?: string;
    author: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    comments: Array<{
        user: mongoose.Types.ObjectId;
        text: string;
        createdAt: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IPost, {}, {}, {}, mongoose.Document<unknown, {}, IPost> & IPost & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
