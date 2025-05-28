'use client';

import { useState } from "react";
import { trpc } from "@/utils/trpc";

export function TodoList() {
    const [newTask, setNewTask] = useState('');
    const utils = trpc.useUtils();
    const { data: tasks = [] } = trpc.getTasks.useQuery();

    const addTask = trpc.addTask.useMutation({
        onSuccess: () => {
            setNewTask('');
            utils.getTasks.invalidate();
        },
    });

    const toggle = trpc.toggleTask.useMutation({
        onSuccess: () => utils.getTasks.invalidate(),
    });

    return (
        <div style={{ padding: 20 }}>
            <h1>📝 To-do List</h1>
            <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New task"
            />
            <button onClick={() => addTask.mutate(newTask)}>Add</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        <input type="checkbox" checked={task.completed} onChange={() => toggle.mutate(task._id)} />
                        {task.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}