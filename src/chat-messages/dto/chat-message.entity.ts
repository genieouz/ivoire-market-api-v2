import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class ChatMessage {
    @Field(type => ID)
    id: string;
}