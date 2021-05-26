import { InputType, Field } from 'type-graphql';

@InputType()
export class CommentInput {
    @Field()
    discussionId: string;

    @Field()
    content: string;

    @Field()
    postedBy: string;
}
