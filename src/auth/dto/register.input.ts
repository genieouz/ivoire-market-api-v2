import { ApiProperty } from "@nestjs/swagger";
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterInput {
    @Field()
    public password: string;

    @Field()
    public email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}
