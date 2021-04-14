import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateProductInput {
    @Field()
    id: string;
}
