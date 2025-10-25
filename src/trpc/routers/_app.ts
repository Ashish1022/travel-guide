import { tripRouter } from "@/modules/trip/server/procedure";
import { createTRPCRouter } from "../init";

import { authRouter } from "@/modules/auth/server/procedure";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    trip: tripRouter,
})

export type AppRouter = typeof appRouter;