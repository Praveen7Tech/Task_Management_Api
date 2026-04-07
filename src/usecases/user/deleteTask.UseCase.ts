import { IDeleteTaskUseCase } from "../../application/interfaces/usecase/user/deleteTask.usecase.interface";
import { NotFoundError } from "../../common/errors/common.error";
import { ITaskRepository } from "../../domain/repositories/task.repository";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { INotificationService } from "../../domain/services/notification.service";

export class DeleteUseCase implements IDeleteTaskUseCase{
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _taskRepository: ITaskRepository,
        private readonly _notificationService: INotificationService
    ){}

    async execute(taskId: string, userId: string): Promise<void> {
        const user = await this._userRepository.findById(userId)
        if(!user) throw new NotFoundError("User not found");

        const task = await this._taskRepository.findById(taskId);
        if (!task) {
            throw new NotFoundError("Task not found");
        }

        await this._taskRepository.delete(taskId);

        await this._notificationService.broadcastTaskActivity(user.id,user.name,task.title,"DELETE")
    }
}