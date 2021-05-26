import { InputType, Field } from 'type-graphql';

@InputType()
export class ForumMessageInput {
    @Field()
    subject: string;

    @Field()
    content: string;

    @Field()
    postedBy: string;
}
