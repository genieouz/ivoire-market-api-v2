import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Task {
    @Field(type => ID)
    id: string;
}