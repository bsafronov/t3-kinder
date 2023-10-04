import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const absenceTagRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        label: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.absenceTag.create({
        data: {
          groupId: input.groupId,
          label: input.label,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        absenceTagId: z.string(),
        label: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.absenceTag.update({
        where: {
          id: input.absenceTagId,
        },
        data: {
          label: input.absenceTagId,
        },
      });
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        absenceTagId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.absenceTag.findUnique({
        where: {
          id: input.absenceTagId,
        },
      });
    }),
  getManyByGroup: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.absenceTag.findMany({
        where: {
          groupId: input.groupId,
        },
      });
    }),
});
