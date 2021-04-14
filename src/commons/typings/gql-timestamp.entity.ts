import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class GqlTimestamp {
    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
