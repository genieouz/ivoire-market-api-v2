import { UserRoles } from '~/user/enums/user-roles.enum';
import { Schema } from 'mongoose';
import { imageSizesNestedObject } from '~/commons/database/field-types/image-size-refs-hash.type';

export const UserSchema = new Schema({
  phoneNumber: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: UserRoles.USER,
  },
  salt: {
    type: String,
    required: true,
  },
  avatar: imageSizesNestedObject,
}, { timestamps: true });
