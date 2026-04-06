
export type Priority = "high" | "medium" | "low";
export type Status = "pending" | "completed" 

export class Task {
    constructor(
        public readonly id: string,
        public readonly userId: string, 
        public readonly title: string,
        public readonly description: string,
        public readonly priority: Priority,
        public readonly dueDate: string,
        public readonly status: Status,
        public readonly category: string
    ) {}
}