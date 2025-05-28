import mongoose, { Schema } from 'mongoose';

export type TaskDocument = {
    title: string;
    description: string;
    completed: boolean;
}

const taskSchema = new Schema<TaskDocument>({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
});

export const Task = mongoose.models.Task || mongoose.model<TaskDocument>('Task', taskSchema);