import { InputType, Field } from 'type-graphql';

@InputType()
export class ChatMessageInput {
    @Field()
    id: string;
}
