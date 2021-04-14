import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { ICategory } from '~/category/models/interfaces/category.interface';
import { categoryModelName } from '~/category/models/namings/category.model-name';

@Injectable()
export class CategoryService extends AbstractService<ICategory> {
    constructor(
        @InjectModel(categoryModelName) private readonly categoryModel: Model<ICategory>
    ) {
        super(categoryModel);
    }
}
