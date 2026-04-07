import { Task } from "../../../domain/entities/task";
export type Status = "pending" | "completed" 
export interface TaskData{
    id?:string
    title: string
    description: string;
    priority: "high" | "medium" | "low";
    dueDate: string;
    status: Status;
    category: string;
}

export interface TaskStats {
    total: number;
    completed: number;
    pending: number;
}

export interface TaskDashboardData{
    task: Task[]
    status: TaskStats;
    total: number
    page: number
    totalPages: number
}

export interface PaginatedTasks{
    tasks: Task[];
    total: number
}