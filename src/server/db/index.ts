import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app'

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        throw new Error(`DB connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
};