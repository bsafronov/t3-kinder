import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteTagRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        label: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.noteTag.create({
        data: {
          groupId: input.groupId,
          label: input.label,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        noteTagId: z.string(),
        label: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.noteTag.update({
        where: {
          id: input.noteTagId,
        },
        data: {
          label: input.label,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        noteTagId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.noteTag.delete({
        where: {
          id: input.noteTagId,
        },
      });
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        noteTagId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.noteTag.findUnique({
        where: {
          id: input.noteTagId,
        },
      });
    }),
  getManyByGroup: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.noteTag.findMany({
        where: {
          groupId: input.groupId,
        },
      });
    }),
});
