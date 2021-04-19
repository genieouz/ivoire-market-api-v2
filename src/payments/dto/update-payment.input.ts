import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdatePaymentInput {
    @Field()
    id: string;
}
