import { Schema }  from 'mongoose';
import { commonSchemaOptions } from '~/commons/database/common-schema-options';

export const commentSchema = new Schema({
  discussionId: { type: Schema.Types.ObjectId },
  content: { type: String },
  // attachment: { type: attachmentRecordSchema },
  postedBy: { type: String }
}, commonSchemaOptions);
