
import mongoose, { Schema } from 'mongoose';

const PendingUserSchema = new Schema({
 email: { type: String, required: true, unique: true },
  payload: {
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
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
    expires: 300 // 5-minute Document TTL
  }
});

export const PendingUserModel = mongoose.model('PendingUser', PendingUserSchema);
