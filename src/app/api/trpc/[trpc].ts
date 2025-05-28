import * as trpcNext from '@trpc/server/adapters/next';
import { tasksRouter } from '@/server/routers/tasks';

export default trpcNext.createNextApiHandler({
    router: tasksRouter,
    createContext: () => ({}),
});