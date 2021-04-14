import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Task } from "~/tasks/dto/task.entity";
import { TaskService } from "~/tasks/services/task.service";
import { ITask } from "~/tasks/models/interfaces/task.interface";
import { TaskInput } from "~/tasks/dto/task.input";
import { UpdateTaskInput } from "~/tasks/dto/update-task.input";
import { ID } from "type-graphql";
import { ClientFilterInput } from "~/commons/graphql/types-and-inputs/client-filter.input";


@Resolver()
export class TaskResolver {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Mutation(returns => Task)
    createTask(
        @Args({ name: 'taskInput', type: () => TaskInput }) taskInput: TaskInput,
    ): Promise<ITask> {
        return this.taskService.insertOne(taskInput);
    }

    @Mutation(returns => Task)
    updateTask(
        @Args({ name: 'taskId', type: () => ID }) taskId: string,
        @Args({ name: 'taskInput', type: () => UpdateTaskInput }) taskInput: UpdateTaskInput,
    ): Promise<ITask> {
        return this.taskService.updateOneById(taskId, taskInput);
    }

    @Query(returns => Task)
    fetchTask(
        @Args({ name: 'taskId', type: () => ID }) taskId: string,
    ): Promise<ITask> {
        return this.taskService.findOneByIdOrFail(taskId);
    }

    @Query(returns => [Task])
    fetchTasks(
        @Args({ name: 'clientFilter', type: () => ClientFilterInput }) clientFilter: ClientFilterInput,
    ): Promise<ITask[]> {
        return this.taskService.find({}, clientFilter);
    }

    @Mutation(returns => Boolean)
    removeTask(
        @Args({ name: 'taskId', type: () => ID }) taskId: string,
    ): Promise<boolean> {
        return this.taskService.removeOneByIdOrFail(taskId);
    }
}
