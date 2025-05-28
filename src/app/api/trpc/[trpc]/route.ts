import { taskRouter } from '@/server/trpc/router';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: taskRouter,
        createContext: () => ({}),
    });

export { handler as GET, handler as POST };