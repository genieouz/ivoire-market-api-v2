import { InputType, Field, ID } from 'type-graphql';
import { CategoryStatus } from '../enums/category-status.enum';

@InputType()
export class UpdateCategoryInput {
    @Field({ nullable: true })
    name: string;

    @Field(type => ID, { nullable: true })
    parent: string;

    @Field(type => CategoryStatus)
    status: CategoryStatus;
}
