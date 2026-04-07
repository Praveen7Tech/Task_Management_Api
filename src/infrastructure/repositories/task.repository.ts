// src/infrastructure/repositories/task.repository.ts
import { PaginatedTasks, TaskDashboardData, TaskStats } from "../../application/dto/user/task.type";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task.repository";
import { TaskModel } from "../database/models/task.model";

export class TaskRepository implements ITaskRepository {
    
    async create(data: Partial<Task>): Promise<Task> {
        const created = await TaskModel.create(data);
        return this._mapToEntity(created);
    }

    async findById(id: string): Promise<Task | null> {
        const doc = await TaskModel.findById(id).lean();
        if (!doc) return null;
        return this._mapToEntity(doc);
    }

    async findByUserId(userId: string): Promise<Task[]> {
        const docs = await TaskModel.find({ userId }).lean();
        return docs.map(doc => this._mapToEntity(doc));
    }

    async findAll(page: number, limit: number): Promise<PaginatedTasks> {
        const skip =  (page - 1) * limit
       const [docs, total] = await Promise.all([
        TaskModel.find()
                  .sort({createdAt: -1})
                  .skip(skip)
                  .limit(limit),
        TaskModel.countDocuments()          
       ])
        return {tasks:docs.map(doc => this._mapToEntity(doc)),total}
    }

    async getStats(): Promise<TaskStats> {
        const stats = await TaskModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    completed: {
                        $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
                    },
                    pending: {
                        $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
                    }
                }
            }
        ]);

        return stats[0] || { total: 0, completed: 0, pending: 0 };
    }

    async update(id: string, data: Partial<Task>): Promise<Task | null> {
        const updatedDoc = await TaskModel.findByIdAndUpdate(
                id,
                { $set: data }, 
                { new: true, runValidators: true }
        ).lean();

        return updatedDoc ? this._mapToEntity(updatedDoc) : null;
    }

    async delete(id: string): Promise<void> {
        await TaskModel.findByIdAndDelete(id);
    }

    // Mapper: Converts DB Document to Domain Entity
    private _mapToEntity(doc: any): Task {
        return new Task(
            doc._id.toString(),
            doc.userId.toString(),
            doc.title,
            doc.description,
            doc.priority,
            doc.dueDate,
            doc.status,
            doc.category
        );
    }
}
