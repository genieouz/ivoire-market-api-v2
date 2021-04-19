import { registerEnumType } from 'type-graphql';

export enum PaymentMethod {
  card = 'card',
  orangeMoney = 'orangeMoney',
  paypal = 'paypal',
}

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
});
