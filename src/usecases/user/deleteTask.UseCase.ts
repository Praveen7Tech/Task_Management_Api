import { IDeleteTaskUseCase } from "../../application/interfaces/usecase/user/deleteTask.usecase.interface";
import { NotFoundError } from "../../common/errors/common.error";
import { ITaskRepository } from "../../domain/repositories/task.repository";

export class DeleteUseCase implements IDeleteTaskUseCase{
    constructor(
        private readonly _taskRepository: ITaskRepository
    ){}

    async execute(taskId: string, userId: string): Promise<void> {
         const task = await this._taskRepository.findById(taskId);

        if (!task) {
            throw new NotFoundError("Task not found");
        }

        await this._taskRepository.delete(taskId);
    }
}