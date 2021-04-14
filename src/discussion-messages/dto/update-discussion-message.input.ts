import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateDiscussionMessageInput {
    @Field()
    id: string;
}
