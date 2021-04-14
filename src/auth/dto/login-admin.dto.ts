import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginAdminDto {
    @Field()
    emailOrPhone: number;

    @Field()
    password: string;
}
