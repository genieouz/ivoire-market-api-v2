import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateServiceInput {
    @Field()
    id: string;
}
