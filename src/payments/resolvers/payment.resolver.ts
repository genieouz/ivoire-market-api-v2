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
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService
    ) { }

    @Mutation(returns => Payment)
    chargeCard(
        @Args({ name: 'paymentInput', type: () => Any }) paymentInput: PaymentInput,
    ): Promise<IPayment> {
        return this.paymentService.chargeCard(paymentInput);
    }

    @Mutation(returns => Payment)
    updatePayment(
        @Args({ name: 'paymentId', type: () => ID }) paymentId: string,
        @Args({ name: 'paymentInput', type: () => UpdatePaymentInput }) paymentInput: UpdatePaymentInput,
    ): Promise<IPayment> {
        return this.paymentService.updateOneById(paymentId, paymentInput);
    }

    @Query(returns => Payment)
    fetchPayment(
        @Args({ name: 'paymentId', type: () => ID }) paymentId: string,
    ): Promise<IPayment> {
        return this.paymentService.findOneByIdOrFail(paymentId);
    }

    @Query(returns => [Payment])
    fetchPayments(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    ): Promise<IPayment[]> {
        return this.paymentService.find({}, clientFilter);
    }

    @Mutation(returns => Boolean)
    removePayment(
        @Args({ name: 'paymentId', type: () => ID }) paymentId: string,
    ): Promise<boolean> {
        return this.paymentService.removeOneByIdOrFail(paymentId);
    }
}
