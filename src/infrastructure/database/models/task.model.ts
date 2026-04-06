import mongoose, { Schema, Document } from "mongoose";

export interface ITaskDocument extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    dueDate: string;
    category: string;
    status: "pending" | "completed"
}

const TaskSchema = new Schema<ITaskDocument>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["high", "medium", "low"], default: "medium" },
    dueDate: { type: String },
    status: { type: String, enum: ["pending", "completed"], default: "pending"  },
    category: { type: String, default: "General" }
}, { timestamps: true });

export const TaskModel = mongoose.model<ITaskDocument>("Task", TaskSchema);
