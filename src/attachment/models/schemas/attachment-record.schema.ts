import { Schema } from 'mongoose';
import { commonSchemaOptions } from '~/commons/database/common-schema-options';

export const attachmentRecordSchema = new Schema(
  {
    title: {
      type: String,
    },
    extension: {
      type: String,
      // required: true,
    },
    mimeType: {
      type: String,
      // require: true,
    },
    bucketRef: {
      type: String,
      // require: true,
    },
    filename: {
      type: String,
      // require: true,
    },
    sizeB: {
      type: Number,
    },
    uploadedBy: {
      type: String,
      // require: true,
    },
  },
  commonSchemaOptions,
);
