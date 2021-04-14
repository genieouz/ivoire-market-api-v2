import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateChatMessageInput {
    @Field()
    id: string;
}
