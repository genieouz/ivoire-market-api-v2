import { commonSchemaOptions } from '~/commons/database/common-schema-options';
import { Schema } from 'mongoose';

export const attachmentSchema = new Schema(
  {
    extension: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      require: true,
    },
    bucketRef: {
      type: String,
      require: true,
    },
    filename: {
      type: String,
      require: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uploadedBy: {
      type: String,
      require: true,
    },
  },
  commonSchemaOptions,
);
