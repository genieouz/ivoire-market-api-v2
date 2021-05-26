import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateCommentInput {
    @Field()
    id: string;
}
