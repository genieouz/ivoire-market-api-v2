import { Document } from 'mongoose';
import { AnyObject } from '~/commons/typings/typescript';
import { IcardItems } from './carditems.interface';

export interface IProductBill extends Document {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    town: string;
    postalcode: string;
    cartItems: IcardItems;
    paymentInfos: AnyObject;
    charge: AnyObject;
}
