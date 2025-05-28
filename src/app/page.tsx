'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '@/utils/trpc';
import { useState } from 'react';
import { Header } from './components/Header';
import { Task } from './components/Task';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { TaskType } from './Types';

function TodoList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [editTask, setEditTask] = useState<{ id: string, title: string, description: string } | null>(null);
    const isEditing = Boolean(editTask);
    const utils = trpc.useUtils();
    const { data: tasks = [] as TaskType[] } = trpc.getTasks.useQuery();

    const addTask = trpc.addTask.useMutation({
        onSuccess: () => {
            setNewTitle('');
            setNewDescription('');
            setIsModalOpen(false);
            utils.getTasks.invalidate();
        },
    });

    const updateTask = trpc.updateTask.useMutation({
        onSuccess: () => {
            setEditTask(null);
            setNewTitle('');
            setNewDescription('');
            setIsModalOpen(false);
            utils.getTasks.invalidate();
        },
    });


    const deleteTask = trpc.deleteTask.useMutation({
        onSuccess: () => {},
    });

    const handleSave = () => {
        if (!newTitle.trim()) return;

        if (isEditing && editTask) {
            updateTask.mutate({ id: editTask.id, title: newTitle, description: newDescription });
        } else {
            addTask.mutate({ title: newTitle, description: newDescription });
        }
    };

    const handleDelete = (id: string) => {
        deleteTask.mutate({ id });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-100">
            <div className="bg-white rounded-lg shadow-md w-96">
                <Header />
                <div className="divide-y divide-gray-200">
                    {tasks.map((task: TaskType) => (
                        <Task
                            key={task._id}
                            task={task}
                            handleDelete={() => {
                                handleDelete(task._id);
                            }}
                            onEdit={() => {
                                setEditTask({ id: task._id, title: task.title, description: task.description });
                                setNewTitle(task.title);
                                setNewDescription(task.description);
                                setIsModalOpen(true);
                            }}
                        />
                    ))}
                </div>
                <div className="flex justify-center p-4">
                    <Button onClick={() => setIsModalOpen(true)}>New task</Button>
                </div>
            </div>

            <Modal
                title={isEditing ? "Change Task" : "Add new Task"}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditTask(null);
                    setNewTitle('');
                    setNewDescription('');
                }}
                onSave={handleSave}
            >
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={4}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
            </Modal>
        </div>
    );
}

const queryClient = new QueryClient();

export default function Home() {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <TodoList />
            </QueryClientProvider>
        </trpc.Provider>
    );
}