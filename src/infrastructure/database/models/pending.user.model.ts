// src/infrastructure/database/models/pending-user.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPendingUser extends Document {
  email: string;
  name: string;
  passwordHash: string;
  otp: string;
  otpGeneratedAt: Date;
  createdAt: Date;
}

const PendingUserSchema = new Schema<IPendingUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  name: { 
    type: String, 
    required: true 
},
  passwordHash: { 
    type: String, 
    required: true 
},
  otp: { 
    type: String, 
    required: true 
},
  otpGeneratedAt: { 
    type: Date, 
    default: Date.now 
}, 
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 300 
  }
});

export const PendingUserModel = mongoose.model<IPendingUser>('PendingUser', PendingUserSchema);
