import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const vaccinationTagRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.vaccinationTag.findMany({
        where: {
          groupId: input.groupId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        label: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.vaccinationTag.create({
        data: {
          groupId: input.groupId,
          label: input.label,
        },
      });
    }),
});
