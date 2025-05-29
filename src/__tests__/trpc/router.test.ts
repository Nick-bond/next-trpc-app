import { taskRouter } from '@/server/trpc/router';
import { Task } from '@/server/db/models';
import { connectDB } from '@/server/db';

jest.mock('../../server/db');

jest.mock('@/server/db/models', () => {
    const actual = jest.requireActual('@/server/db/models');
    return {
        ...actual,
        Task: Object.assign(
            jest.fn(),
            {
                find: jest.fn(),
                findById: jest.fn(),
                findByIdAndUpdate: jest.fn(),
                findByIdAndDelete: jest.fn(),
            }
        )
    };
});

describe('taskRouter', () => {
    const mockTask = {
        _id: '123',
        title: 'Test task',
        description: 'description',
        completed: false,
        save: jest.fn().mockResolvedValue(true),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (connectDB as jest.Mock).mockResolvedValue(undefined);
    });

    describe('getTasks', () => {
        it('should return list of tasks', async () => {
            (Task.find as jest.Mock).mockResolvedValue([mockTask]);
            const result = await taskRouter.createCaller({}).getTasks();
            expect(result).toEqual([mockTask]);
            expect(Task.find).toHaveBeenCalled();
        });
    })

    describe('addTask', () => {
        it('should create a new task', async () => {
            const input = { title: 'New Task', description: 'New Desc' };
            const mockSave = jest.fn().mockResolvedValue(true);
            const savedTask = { ...input, completed: false, save: mockSave };

            (Task as unknown as jest.Mock).mockImplementation(() => savedTask);
            const result = await taskRouter.createCaller({}).addTask(input);

            expect(result).toEqual(savedTask);
            expect(mockSave).toHaveBeenCalled();
        });
    });

    describe('updateTask', () => {
        it('should update an existing task', async () => {
            const input = { id: '123', title: 'Updated', description: 'Updated desc' };
            const updatedTask = { ...input };

            (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedTask);

            const result = await taskRouter.createCaller({}).updateTask(input);
            expect(result).toEqual(updatedTask);
            expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
                input.id,
                { title: input.title, description: input.description },
                { new: true }
            );
        });
    });

    describe('toggleTask', () => {
        it('should flip completed flag', async () => {
            const mockSave = jest.fn().mockResolvedValue(true);
            const task = { ...mockTask, completed: false, save: mockSave };

            (Task.findById as jest.Mock).mockResolvedValue(task);

            const result = await taskRouter.createCaller({}).toggleTask({ id: '123' });

            expect(task.completed).toBe(true);
            expect(mockSave).toHaveBeenCalled();
            expect(result).toBe(task);
        });
    });

    describe('deleteTask', () => {
        it('should delete the task', async () => {
            (Task.findByIdAndDelete as jest.Mock).mockResolvedValue(mockTask);
            const result = await taskRouter.createCaller({}).deleteTask({ id: '123' });
            expect(result).toEqual({ success: true });
            expect(Task.findByIdAndDelete).toHaveBeenCalledWith('123');
        });

        it('throws error if task not found', async () => {
            (Task.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

            await expect(
                taskRouter.createCaller({}).deleteTask({ id: 'missing' })
            ).rejects.toThrow('Task not found');
        });
    });
});