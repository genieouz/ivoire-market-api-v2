import { Document } from 'mongoose';
import { AnyObject } from '~/commons/typings/typescript';
import { IcardItems } from './carditems.interface';

export interface IPayment extends Document {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    town: string;
    postalcode: string;
    carditems: IcardItems[];
    paymentInfos: AnyObject;
    charge: AnyObject;
}
