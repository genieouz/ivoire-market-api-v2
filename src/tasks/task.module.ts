import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from '~/tasks/services/task.service';
import { taskModelName } from '~/tasks/models/namings/task.model-name';
import { taskSchema } from '~/tasks/models/schemas/task.schema';
import { TaskResolver } from '~/tasks/resolvers/task.resolver';
import { TaskPropertyResolver } from '~/tasks/resolvers/task-property.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: taskModelName, schema: taskSchema },
    ]),
  ],
  providers: [
      TaskService,
      TaskResolver,
      TaskPropertyResolver
  ],
  exports: [TaskService]
})
export class TasksModule {}
