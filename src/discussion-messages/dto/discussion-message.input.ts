import { InputType, Field } from 'type-graphql';

@InputType()
export class DiscussionMessageInput {
    @Field()
    id: string;
    @Field()
    message : string
}
