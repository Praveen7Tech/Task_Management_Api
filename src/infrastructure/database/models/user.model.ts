// infrastructure/database/models/user.model.ts
import mongoose, { Schema, Document } from "mongoose";

// Represents the raw MongoDB document shape
export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);