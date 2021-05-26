import { userModelName } from '~/user/user.model-name';
import { IUser } from '~/user/interfaces/user.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { User } from '~/user/dto/user.entity';
import { ProductService } from '~/products/services/product.service';
import { providerProductIdsQuery } from '~/products/models/queries/provider-products-ids.query';
import { DocId } from '~/commons/typings/typescript';

@Injectable()
export class UserService extends AbstractService<IUser> {
    constructor(
        @InjectModel(userModelName) private readonly userModel: Model<IUser>,
        private readonly productService: ProductService
    ) {
        super(userModel);
    }

    fetchProviderProductsIds(userId: DocId): Promise<DocId[]> {
        return this.productService.aggregateIds(providerProductIdsQuery(userId));
    }
}
