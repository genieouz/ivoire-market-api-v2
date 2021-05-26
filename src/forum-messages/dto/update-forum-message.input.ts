import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateForumMessageInput{
    @Field()
    subject: string;

    @Field()
    content: string;
}
