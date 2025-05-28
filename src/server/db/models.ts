import mongoose, { Schema, Document } from 'mongoose';

export interface TaskDocument extends Document {
    title: string;
    description: string;
    completed: boolean;
}

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Task = mongoose.model<TaskDocument>('Task', taskSchema);
