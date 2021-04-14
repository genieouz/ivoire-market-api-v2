import { InputType, Field } from 'type-graphql';

@InputType()
export class TaskInput {
    @Field()
    id: string;
}
