import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { IProduct } from '~/products/models/interfaces/product.interface';
import { productModelName } from '~/products/models/namings/product.model-name';

@Injectable()
export class ProductService extends AbstractService<IProduct> {
    constructor(
        @InjectModel(productModelName) private readonly productModel: Model<IProduct>
    ) {
        super(productModel);
    }
}
