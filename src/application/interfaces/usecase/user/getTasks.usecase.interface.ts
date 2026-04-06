import { TaskDashboardData } from "../../../dto/user/task.type";

export interface IGetTasksUseCase{
    execute(): Promise<TaskDashboardData>
}