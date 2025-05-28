import { z } from 'zod';
import { procedure, router  } from '../trpc';
import { connectDB } from '../db';
import { Task } from '../db/models';

export const tasksRouter = router({
    getTasks: procedure.query(async () => {
        await connectDB();
        return Task.find();
    }),

    addTask: procedure.input(z.string()).mutation(async ({ input }) => {
        await connectDB();
        const task = new Task({ text: input, completed: false });
        await task.save();
        return task;
    }),

    toggleTask: procedure.input(z.string()).mutation(async ({ input }) => {
        await connectDB();
        const task = await Task.findById(input);
        task.completed = !task.completed;
        await task.save();
        return task;
    }),
    // Remove to be done
    deleteTask: procedure.input(z.string()).mutation(async ({ input }) => {
        await connectDB();
        const task = new Task({ text: input, completed: false });
        await task.save();
        return task;
    }),
});

export type tasksRouter = typeof tasksRouter;