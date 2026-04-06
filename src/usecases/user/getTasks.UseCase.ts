import { TaskDashboardData } from "../../application/dto/user/task.type";
import { IGetTasksUseCase } from "../../application/interfaces/usecase/user/getTasks.usecase.interface";
import { ITaskRepository } from "../../domain/repositories/task.repository";

export class GetTasksUseCase implements IGetTasksUseCase{
    constructor(
        private readonly _taskRepository: ITaskRepository
    ){}

    async execute(): Promise<TaskDashboardData> {
        const [tasks, stats] = await Promise.all([
            this._taskRepository.findAll(),
            this._taskRepository.getStats(),
        ]);

        return {
            task: tasks,
            status: stats,
        };
    }
}