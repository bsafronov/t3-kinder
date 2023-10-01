import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), createdBy: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.group.create({
        data: {
          title: input.title,
          createdById: input.createdBy,
          userIDs: [input.createdBy],
          adminIDs: [input.createdBy],
        },
      });
    }),
});
