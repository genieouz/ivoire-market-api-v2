import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { IService } from '~/services/models/interfaces/service.interface';
import { serviceModelName } from '~/services/models/namings/service.model-name';

@Injectable()
export class ServiceService extends AbstractService<IService> {
    constructor(
        @InjectModel(serviceModelName) private readonly serviceModel: Model<IService>
    ) {
        super(serviceModel);
    }
}
