import { Schema }  from 'mongoose';
import { attachmentRecordSchema } from '~/attachment/models/schemas/attachment-record.schema';
import { commonSchemaOptions } from '~/commons/database/common-schema-options';
import { userModelName } from '~/user/user.model-name';

export const forumMessageSchema = new Schema({
  subject: { type: String },
  content: { type: String },
  // attachment: { type: attachmentRecordSchema },
  postedBy: { type: String }
}, commonSchemaOptions);
