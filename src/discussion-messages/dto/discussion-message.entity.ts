import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class DiscussionMessage {
    @Field(type => ID)
    id: string;
}