import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.group.create({
        data: {
          title: input.title,
          createdById: ctx.session.user.id,
          userIDs: [ctx.session.user.id],
          adminIDs: [ctx.session.user.id],
        },
      });
    }),
  getAll: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.group.findMany({
        where: {
          userIDs: {
            has: input.userId,
          },
        },
      });
    }),
  getById: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.group.findUnique({
        where: {
          id: input.groupId,
        },
        include: {
          _count: true,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.group.delete({
        where: {
          id: input.groupId,
        },
      });
    }),
});
