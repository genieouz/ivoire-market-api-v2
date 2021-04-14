import { ObjectType, Field, ID } from 'type-graphql';
import { ICategory } from '~/category/models/interfaces/category.interface';
import { GqlTimestamp } from '~/commons/typings/gql-timestamp.entity';
import { CategoryStatus } from '../enums/category-status.enum';

@ObjectType()
export class Category extends GqlTimestamp {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field(type => ID)
    owner: string;

    @Field(type => Category, { nullable: true })
    parent: ICategory;

    @Field(type => CategoryStatus)
    status: CategoryStatus;

    @Field()
    price: number;
}
