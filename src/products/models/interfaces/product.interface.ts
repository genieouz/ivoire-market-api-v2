import { Document } from 'mongoose';
import { ImageSizes } from '~/commons/graphql/types-and-inputs/image-sizes.type';
import { AnyObject } from '~/commons/typings/typescript';

export interface IProduct extends Document {
    _id: string;
    cover: ImageSizes;
    name: string;
    owner: string;
    category: string;
    gallery: string[];
    price: number;
    variants: AnyObject[];
}
