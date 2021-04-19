import { Document } from 'mongoose';
import { CategoryStatus } from '~/category/enums/category-status.enum';

export interface ICategory extends Document {
    _id: string;
    name: string;
    owner: string;
    parent: string;
    status: CategoryStatus;
}
