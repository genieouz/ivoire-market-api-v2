import { ObjectType, Field, ID } from 'type-graphql';
import { IcardItems } from '../models/interfaces/carditems.interface';
import { AnyObject } from '~/commons/typings/typescript';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { CardItem } from './card-item.entity';

@ObjectType()
export class Payment {
    @Field({ nullable: true })
    firstname: string;

    @Field({ nullable: true })
    lastname: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    phone: string;

    @Field({ nullable: true })
    address: string;

    @Field({ nullable: true })
    country: string;

    @Field({ nullable: true })
    town: string;

    @Field({ nullable: true })
    postalcode: string;

    @Field(type => [CardItem], { nullable: true })
    carditems: IcardItems[];

    @Field(type => Any, { nullable: true })
    paymentInfos: AnyObject;

    @Field(type => Any, { nullable: true })
    charge: AnyObject;
}