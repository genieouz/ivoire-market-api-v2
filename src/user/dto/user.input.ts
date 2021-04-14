import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class UserInput {
    @Field({ nullable: true })
    public phoneNumber: string;

    @Field({ nullable: true })
    public lastName: string;

    @Field({ nullable: true })
    public firstName: string;

    @Field({ nullable: true })
    public password: string;

    @Field({ nullable: true })
    public email: string;
}
