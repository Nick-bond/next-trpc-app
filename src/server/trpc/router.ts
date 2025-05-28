import {z} from 'zod';
import {initTRPC} from '@trpc/server';
import {connectDB} from '../db';
import {Task} from '../db/models';

const t = initTRPC.create();

export const taskRouter = t.router({
    getTasks: t.procedure.query(async () => {
        await connectDB();
        return Task.find();
    }),

    addTask: t.procedure
        .input(z.object({
            title: z.string(),
            description: z.string().optional(),
        }))
        .mutation(async ({input}) => {
            await connectDB();
            const task = new Task({
                title: input.title,
                description: input.description || '',
                completed: false,
            });
            if (!task) {
                throw new Error('Task not found');
            }
            await task.save();
            return task;
        }),

    updateTask: t.procedure
        .input(z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
        }))
        .mutation(async ({input}) => {
            await connectDB();
            const task = await Task.findByIdAndUpdate(
                input.id,
                {title: input.title, description: input.description || ''},
                {new: true}
            );
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        }),
    toggleTask: t.procedure
        .input(z.object({id: z.string()}))
        .mutation(async ({input}) => {
            await connectDB();
            const task = await Task.findById(input.id);
            if (!task) {
                throw new Error('Task not found');
            }
            task.completed = !task.completed;
            await task.save();
            return task;
        }),

    deleteTask: t.procedure
        .input(z.object({id: z.string()}))
        .mutation(async ({input}) => {
            await connectDB();
            const task = await Task.findByIdAndDelete(input.id);
            if (!task) {
                throw new Error('Task not found');
            }
            return {success: true};
        }),
});

export type taskRouter = typeof taskRouter;