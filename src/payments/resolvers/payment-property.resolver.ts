import { Resolver } from "@nestjs/graphql";
import { Payment } from "~/payments/dto/payment.entity";
import { PaymentService } from "~/payments/services/payment.service";


@Resolver(of => Payment)
export class PaymentPropertyResolver {
    constructor(
        private readonly paymentService: PaymentService
    ) { }
}
