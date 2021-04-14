import { Schema }  from 'mongoose';
import { imageSizesNestedObject } from '~/commons/database/field-types/image-size-refs-hash.type';
import { attachmentRecordSchema } from '~/attachment/models/schemas/attachment-record.schema';
import { categoryModelName } from '~/category/models/namings/category.model-name';
import { userModelName } from '~/user/user.model-name';

export const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  code: {
    type: String,
  },
  price: {
    type: Number,
    default: 0
  },
  quota: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId, ref: categoryModelName,
  },
  owner: { type: Schema.Types.ObjectId, ref: userModelName },
  cover: {
    type: attachmentRecordSchema
  },
  gallery: {
    type: [attachmentRecordSchema]
  },
});
