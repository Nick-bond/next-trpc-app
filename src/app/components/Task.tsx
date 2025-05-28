'use client';
import React from "react";
import { Pencil, Trash } from "lucide-react";
import { TaskType } from '../Types';
type Task = {
    task: TaskType;
    onDelete: () => void;
    onEdit: () => void;
}
export const Task: React.FC<Task> = ({ task, onEdit, onDelete }) => {
    return (
        <div className="flex items-center justify-between px-4 py-2">
            <label className="flex items-center space-x-2">
                <input type="checkbox" checked={task.completed} />
                <span className={`${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</span>
                <div>
                    <span className={`${task.completed ? "line-through text-gray-500" : ""}`}>{task.description}</span>
                </div>
            </label>
            <div className="flex space-x-2 text-gray-500">
                <Pencil className="w-4 h-4 cursor-pointer" onClick={onEdit} />
                <Trash className="w-4 h-4 cursor-pointer" onClick={onDelete}/>
            </div>
        </div>
    );
}