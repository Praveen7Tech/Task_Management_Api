import { TaskData } from "../../../dto/user/task.type";

export interface ICreateTaskUseCase{
    execute(userId: string, data: TaskData): Promise<TaskData>
}