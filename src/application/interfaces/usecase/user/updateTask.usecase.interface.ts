import { Task } from "../../../../domain/entities/task";

export interface IUpdateTaskUseCase{
    execute(taskId: string, userId: string, updateData: Partial<Task>): Promise<void>
}