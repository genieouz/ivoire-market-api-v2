import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateTaskInput {
    @Field()
    id: string;
}
