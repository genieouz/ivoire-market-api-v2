import { UserRoles } from '~/user/enums/user-roles.enum';
import { ImageSizes } from '~/commons/graphql/types-and-inputs/image-sizes.type';
import { Document } from 'mongoose';
export interface IUser extends Document {
  _id: string;
  phoneNumber: string;
  password: string;
  email: string;
  avatar: ImageSizes;
  firstName: string;
  lastName: string;
  salt: string;
}