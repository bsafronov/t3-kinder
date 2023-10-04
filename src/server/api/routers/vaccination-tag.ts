import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const vaccinationTagRouter = createTRPCRouter({
  getAllByGroup: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.vaccinationTag.findMany({
        where: {
          groupId: input.groupId,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.vaccinationTag.findMany({});
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
  delete: protectedProcedure
    .input(
      z.object({
        vaccinationTagId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.vaccinationTag.delete({
        where: {
          id: input.vaccinationTagId,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        vaccinationTagId: z.string(),
        label: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.vaccinationTag.update({
        where: {
          id: input.vaccinationTagId,
        },
        data: {
          label: input.label,
        },
      });
    }),
});
