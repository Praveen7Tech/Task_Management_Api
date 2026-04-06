import { TaskData } from "../../application/dto/user/task.type";
import { ICreateTaskUseCase } from "../../application/interfaces/usecase/user/createTask.usecase.interface";
import { NotFoundError } from "../../common/errors/common.error";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task.repository";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class CreateTaskUseCase implements ICreateTaskUseCase{
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _taskRepository: ITaskRepository
    ){}

    async execute(userId: string, data: TaskData): Promise<TaskData> {
        
        const user = await this._userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found for creating the task");
        }

        // Map DTO to a format the Repository understands
        const taskToCreate: Partial<Task> = {
            ...data,
            userId: user.id, 
            completed: false 
        };

        //  Persistence: Delegate to Repository
        const createdTask = await this._taskRepository.create(taskToCreate);

        return createdTask;
    }
}