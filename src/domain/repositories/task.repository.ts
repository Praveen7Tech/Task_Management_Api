import { PaginatedTasks, TaskDashboardData, TaskStats } from "../../application/dto/user/task.type";
import { Task } from "../entities/task";


export interface ITaskRepository {
    create(task: Partial<Task>): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    findByUserId(userId: string): Promise<Task[]>;
    findAll(page: number, limit: number): Promise<PaginatedTasks>;
    getStats(): Promise<TaskStats>;
    update(id: string, data: Partial<Task>): Promise<Task | null>
    delete(id: string): Promise<void>;
}
