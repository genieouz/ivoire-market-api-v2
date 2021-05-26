import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { IPayment } from '~/payments/models/interfaces/payment.interface';
import { paymentModelName } from '~/payments/models/namings/payment.model-name';
import Stripe from 'stripe';
import { IUser } from '~/user/interfaces/user.interface';
import { AnyObject, DocId } from '~/commons/typings/typescript';
import { InjectStripe } from 'nestjs-stripe';
import { PaymentMethod } from '../enum/payment-method.enum';
import { UserService } from '~/user/services/user.service';
import { ProductBill } from '../dto/product-biil.entity';
import { providerProductBillQuery } from '../models/queries/provider-product-bill.query';
import { IProductBill } from '../models/interfaces/product-bill.interface';

@Injectable()
export class PaymentService extends AbstractService<IPayment> {
    constructor(
        @InjectModel(paymentModelName) private readonly paymentModel: Model<IPayment>,
        @InjectStripe() private readonly stripeClient: Stripe,
        private readonly userService: UserService
    ) {
        super(paymentModel);
    }

    async chargeCard(
        paymentInput: AnyObject,
      ): Promise<IPayment> {
        console.log({ id: paymentInput.id})
        const charge = await this.stripeClient.charges.create({
            amount: paymentInput.amount,
            currency: 'xof',
            source: paymentInput.id,
        });
        const billDetails = paymentInput.billDetails;
        delete paymentInput.billDetails;
        const payment: IPayment = {
          ...billDetails,
          charge, 
          paymentInfos: paymentInput,
          method: PaymentMethod.card,
        //   user: currentUser._id,
        } as IPayment;
        const result = await this.insertOne(payment);
        return result;
      }

      async fetchProviderBills(userId: DocId): Promise<IProductBill[]> {
        const ids = await this.userService.fetchProviderProductsIds(userId);
        return this.aggregateMany(providerProductBillQuery(ids));
      }
}
