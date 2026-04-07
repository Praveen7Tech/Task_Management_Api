import { TaskDashboardData } from "../../application/dto/user/task.type";
import { IGetTasksUseCase } from "../../application/interfaces/usecase/user/getTasks.usecase.interface";
import { ITaskRepository } from "../../domain/repositories/task.repository";

export class GetTasksUseCase implements IGetTasksUseCase{
    constructor(
        private readonly _taskRepository: ITaskRepository
    ){}

    async execute(page: number, limit: number): Promise<TaskDashboardData> {
        const [{tasks, total}, stats] = await Promise.all([
            this._taskRepository.findAll(page, limit),
            this._taskRepository.getStats(),
        ]);

        const totalPages = Math.ceil(total / limit)

        return {
            task: tasks,
            status: stats,
            total,
            page,
            totalPages
        };
    }
}