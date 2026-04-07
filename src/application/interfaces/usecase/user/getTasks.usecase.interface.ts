import { TaskDashboardData } from "../../../dto/user/task.type";

export interface IGetTasksUseCase{
    execute(page: number, limit: number): Promise<TaskDashboardData>
}