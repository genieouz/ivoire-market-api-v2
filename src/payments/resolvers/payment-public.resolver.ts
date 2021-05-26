import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Payment } from "~/payments/dto/payment.entity";
import { PaymentService } from "~/payments/services/payment.service";
import { IPayment } from "~/payments/models/interfaces/payment.interface";
import { PaymentInput } from "~/payments/dto/payment.input";
import { UpdatePaymentInput } from "~/payments/dto/update-payment.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";
import { Any } from "~/commons/graphql/scalars/any.scalar";


@Resolver()
export class PaymentPublicResolver {
    constructor(
        private readonly paymentService: PaymentService
    ) { }

    @Mutation(returns => Payment)
    chargeCard(
        @Args({ name: 'paymentInput', type: () => Any }) paymentInput: PaymentInput,
    ): Promise<IPayment> {
        return this.paymentService.chargeCard(paymentInput);
    }
}
