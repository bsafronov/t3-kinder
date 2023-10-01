import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { groupRouter } from "./routers/group";
import { kidRouter } from "./routers/kid";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: userRouter,
  groups: groupRouter,
  kids: kidRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
