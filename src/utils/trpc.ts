import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { taskRouter } from '@/server/trpc/router';

export const trpc = createTRPCReact<taskRouter>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: '/api/trpc',
        }),
    ],
});