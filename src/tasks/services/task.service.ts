import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { ITask } from '~/tasks/models/interfaces/task.interface';
import { taskModelName } from '~/tasks/models/namings/task.model-name';

@Injectable()
export class TaskService extends AbstractService<ITask> {
    constructor(
        @InjectModel(taskModelName) private readonly taskModel: Model<ITask>
    ) {
        super(taskModel);
    }
}
