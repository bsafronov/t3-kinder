import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const vaccinationRouter = createTRPCRouter({
  getGroupVaccinations: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.vaccination.findMany({
        where: {
          groupId: input.groupId,
        },
      });
    }),
  getKidVaccinations: protectedProcedure
    .input(z.object({ kidId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.vaccination.findMany({
        where: {
          kidId: input.kidId,
        },
        include: {
          tag: true,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        kidId: z.string(),
        date: z.string(),
        tagId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.vaccination.create({
        data: {
          createdById: ctx.session.user.id,
          groupId: input.groupId,
          kidId: input.kidId,
          tagId: input.tagId,
          date: input.date,
        },
      });
    }),
});
