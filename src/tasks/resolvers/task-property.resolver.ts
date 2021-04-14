import { Resolver } from "@nestjs/graphql";
import { Task } from "~/tasks/dto/task.entity";
import { TaskService } from "~/tasks/services/task.service";


@Resolver(of => Task)
export class TaskPropertyResolver {
    constructor(
        private readonly taskService: TaskService
    ) { }
}
