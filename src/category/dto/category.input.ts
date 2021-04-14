import { InputType, Field, ID } from 'type-graphql';
import { CategoryStatus } from '../enums/category-status.enum';

@InputType()
export class CategoryInput {
    @Field()
    name: string;

    @Field(type => ID, { nullable: true })
    parent: string;
    
    @Field(type => String)
    status: CategoryStatus;
}
