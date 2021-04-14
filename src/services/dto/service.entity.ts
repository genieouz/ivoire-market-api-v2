import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Service {
    @Field(type => ID)
    id: string;
}