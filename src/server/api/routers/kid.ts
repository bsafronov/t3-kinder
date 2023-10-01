import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const kidRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.kid.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.kid.findMany({
        where: {
          groupId: input.groupId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        middleName: z.string(),
        groupId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.kid.create({
        data: {
          createdById: ctx.session.user.id,
          groupId: input.groupId,
          firstName: input.firstName,
          lastName: input.lastName,
          middleName: input.middleName,
        },
      });
    }),
});
