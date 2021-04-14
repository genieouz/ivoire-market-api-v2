import { Document } from 'mongoose';

export interface IAttachment extends Document {
  id: string;
  size: string;
  extension: string;
  mimeType: string;
  bucketRef: string;
  filename: string;
  uploadedBy: string;
  targetRef: string;
}
