import { IUpdateTaskUseCase } from "../../application/interfaces/usecase/user/updateTask.usecase.interface";
import { NotFoundError } from "../../common/errors/common.error";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task.repository";

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
    constructor(
        private readonly _taskRepository: ITaskRepository
    ) {}

    async execute(taskId: string, userId: string, data: Partial<Task>):Promise<void> {
        const task = await this._taskRepository.findById(taskId);
        
        if (!task) throw new NotFoundError("Task not found");
        
        await this._taskRepository.update(taskId, data);
        
    }
}