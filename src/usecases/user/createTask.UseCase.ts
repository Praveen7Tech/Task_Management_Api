import { TaskData } from "../../application/dto/user/task.type";
import { ICreateTaskUseCase } from "../../application/interfaces/usecase/user/createTask.usecase.interface";
import { AlreadyExistError, NotFoundError } from "../../common/errors/common.error";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task.repository";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { INotificationService } from "../../domain/services/notification.service";

export class CreateTaskUseCase implements ICreateTaskUseCase{
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _taskRepository: ITaskRepository,
        private readonly _notificationService: INotificationService
    ){}

    async execute(userId: string, data: TaskData): Promise<TaskData> {
        
        const user = await this._userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found for creating the task");
        }

        const taskNameExist = await this._taskRepository.findByName(data.title)
        if(taskNameExist) throw new AlreadyExistError("Task already exist , choose a alternative Name")

        // Map DTO to a format the Repository understands
        const taskToCreate: Partial<Task> = {
            ...data,
            userId: user.id, 
        };

        //  Persistence: Delegate to Repository
        const createdTask = await this._taskRepository.create(taskToCreate);

        // emit socket notification event
        await this._notificationService.broadcastTaskActivity(user.id,user.name,data.title,"CREATE")

        return createdTask;
    }
}