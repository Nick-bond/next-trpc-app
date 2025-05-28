import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { tasksRouter } from '@/server/routers/tasks';


function getBaseUrl() {
    if (typeof window !== 'undefined') {
        return '';
    }
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<tasksRouter>({
    config() {
        return {
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    async headers() {
                        return {
                            // authorization: getAuthCookie(),
                        };
                    },
                }),
            ],
        };
    },
    /**
     * @see https://trpc.io/docs/v11/ssr
     **/
    ssr: false,
});