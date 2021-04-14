import { Document } from 'mongoose';
import { TranslationsInput } from '~/commons/graphql/types-and-inputs/translations.input';

export interface IAttachmentRecord extends Document {
  id: string;
  title: TranslationsInput;
  sizeB: string;
  extension: string;
  mimeType: string;
  bucketRef: string;
  filename: string;
  uploadedBy: string;
  url: string;
  targetRef: string;
}
