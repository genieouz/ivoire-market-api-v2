import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from '~/payments/services/payment.service';
import { paymentModelName } from '~/payments/models/namings/payment.model-name';
import { paymentSchema } from '~/payments/models/schemas/payment.schema';
import { PaymentResolver } from '~/payments/resolvers/payment.resolver';
import { PaymentPropertyResolver } from '~/payments/resolvers/payment-property.resolver';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: paymentModelName, schema: paymentSchema },
    ]),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2020-08-27',
    }),
  ],
  providers: [
      PaymentService,
      PaymentResolver,
      PaymentPropertyResolver
  ],
  exports: [PaymentService]
})
export class PaymentsModule {}
