import { InputType, Field } from 'type-graphql';

@InputType()
export class ServiceInput {
    @Field()
    id: string;
}
