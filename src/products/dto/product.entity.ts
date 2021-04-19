import { ObjectType, Field, ID } from 'type-graphql';
import { ICategory } from '~/category/models/interfaces/category.interface';
import { Category } from '~/category/dto/category.entity';
import { ImageSizes } from '~/commons/graphql/types-and-inputs/image-sizes.type';
import { AttachmentRecord } from '~/attachment/dto/attachment-record.type';
import { AnyObject } from '~/commons/typings/typescript';
import { Any } from '~/commons/graphql/scalars/any.scalar';

@ObjectType()
export class Product {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    type: string;

    @Field({ nullable: true })
    price: number;

    @Field({ nullable: true })
    code: string;

    @Field({ nullable: true })
    quota: number;

    @Field(type => Category, { nullable: true })
    category: ICategory;

    @Field(type => AttachmentRecord, { nullable: true })
    cover: AttachmentRecord;

    @Field(type => [AttachmentRecord], { nullable: true })
    gallery: AttachmentRecord[];

    @Field(type => Any, { nullable: true })
    variants: AnyObject[];
}