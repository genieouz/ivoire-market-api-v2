import { Schema }  from 'mongoose';
import { categoryModelName } from '~/category/models/namings/category.model-name';
import { userModelName } from '~/user/user.model-name';
import { CategoryStatus } from '~/category/enums/category-status.enum';

export const categorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: categoryModelName },
    owner: { type: Schema.Types.ObjectId, ref: userModelName },
    status: { type: String, default: CategoryStatus.DISABLED, enum: Object.values(CategoryStatus) },
  }, { timestamps: true });
