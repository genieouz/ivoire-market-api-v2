import { Document } from 'mongoose';
import { IAttachment } from '~/attachment/interfaces/attachment.interface';
import { DocId } from '~/commons/typings/typescript';

export interface IForumMessage extends Document {
    _id: string;
    subject: string;
    content: string;
    postedBy: string;
}
