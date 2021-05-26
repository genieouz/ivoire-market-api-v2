import { Document } from 'mongoose';

export interface IComment extends Document {
    discussionId: string;
    content: string;
    postedBy: string;
}
