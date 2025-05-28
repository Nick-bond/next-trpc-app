import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    position: Number,
    completed: Boolean,
});

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);