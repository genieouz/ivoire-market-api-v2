import { Schema }  from 'mongoose';

export const paymentSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  country: { type: String },
  town: { type: String },
  postalcode: { type: String },
  cartitems: [{
    id: { type: String },
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
  }],
  charge: { type: Schema.Types.Mixed },
  paymentInfos: { type: Schema.Types.Mixed },
});
