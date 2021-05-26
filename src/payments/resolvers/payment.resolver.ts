import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Payment } from "~/payments/dto/payment.entity";
import { PaymentService } from "~/payments/services/payment.service";
import { IPayment } from "~/payments/models/interfaces/payment.interface";
import { PaymentInput } from "~/payments/dto/payment.input";
import { UpdatePaymentInput } from "~/payments/dto/update-payment.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";
import { Any } from "~/commons/graphql/scalars/any.scalar";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "~/auth/guards/auth-guard";
import { CurrentUser } from "~/auth/decorators/current-user.decorator";
import { IUser } from "~/user/interfaces/user.interface";
import { IProductBill } from "../models/interfaces/product-bill.interface";
import { ProductBill } from "../dto/product-biil.entity";

@UseGuards(AuthGuard)
@Resolver()
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService
    ) { }

    // @Query(returns => Payment)
    // fetchPayment(
    //     @Args({ name: 'paymentId', type: () => ID }) paymentId: string,
    // ): Promise<IPayment> {
    //     return this.paymentService.findOneByIdOrFail(paymentId);
    // }

    // @Query(returns => [Payment])
    // fetchPayments(
    //     @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    // ): Promise<IPayment[]> {
    //     return this.paymentService.find({}, clientFilter);
    // }

    @Query(returns => [ProductBill])
    fetchProviderBills(
        @CurrentUser() currentUser: IUser
    ): Promise<IProductBill[]> {
        return this.paymentService.fetchProviderBills(currentUser._id);
    }
}
