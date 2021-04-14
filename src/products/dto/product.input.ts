import { InputType, Field } from 'type-graphql';

@InputType()
export class ProductInput {
    @Field()
    id: string;
}
