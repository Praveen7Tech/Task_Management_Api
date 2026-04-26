import { IUpdateTaskUseCase } from "../../application/interfaces/usecase/user/updateTask.usecase.interface";
import { AlreadyExistError, NotFoundError } from "../../common/errors/common.error";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task.repository";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { INotificationService } from "../../domain/services/notification.service";

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _taskRepository: ITaskRepository,
        private readonly _notificationService: INotificationService
    ) {}

    async execute(taskId: string, userId: string, data: Partial<Task>):Promise<void> {
        const user = await this._userRepository.findById(userId)
        if(!user) throw new NotFoundError("User not found");

        const task = await this._taskRepository.findById(taskId);
        if (!task) throw new NotFoundError("Task not found");

        if(data?.title && data.title !== task.title){
            const existingTask = await this._taskRepository.findByName(data.title)

             if (existingTask && existingTask.id !== taskId) {
                throw new AlreadyExistError("Task already exists, choose an alternative name");
            }
        }
        
        await this._taskRepository.update(taskId, data);
        
        await this._notificationService.broadcastTaskActivity(user.id,user.name,task.title,"UPDATE")
    }
}