import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CardItem {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    quantity: number;

    @Field()
    price: number;   
}
