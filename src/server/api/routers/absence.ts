import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const absenceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        kidId: z.string(),
        date: z.string(),
        reason: z.string(),
        tagIDs: z.array(z.string()),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.absence.create({
        data: {
          createdById: ctx.session.user.id,
          groupId: input.groupId,
          kidId: input.kidId,
          date: input.date,
          reason: input.reason,
          tagIDs: input.tagIDs,
        },
        include: {
          createdBy: true,
          updatedBy: true,
          tags: true,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        absenceId: z.string(),
        date: z.string(),
        reason: z.string(),
        tagIDs: z.array(z.string()),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.absence.update({
        where: {
          id: input.absenceId,
        },
        data: {
          updatedById: ctx.session.user.id,
          date: input.date,
          reason: input.reason,
          tagIDs: input.tagIDs,
        },
        include: {
          createdBy: true,
          updatedBy: true,
          tags: true,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        absenceId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.absence.delete({
        where: {
          id: input.absenceId,
        },
      });
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        absenceId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.absence.findUnique({
        where: {
          id: input.absenceId,
        },
        include: {
          createdBy: true,
          updatedBy: true,
          tags: true,
        },
      });
    }),
  getManyByKid: protectedProcedure
    .input(z.object({ kidId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.absence.findMany({
        where: {
          kidId: input.kidId,
        },
        include: {
          createdBy: true,
          updatedBy: true,
          tags: true,
        },
      });
    }),
  getManyByGroup: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.absence.findMany({
        where: {
          groupId: input.groupId,
        },
        include: {
          createdBy: true,
          updatedBy: true,
          tags: true,
        },
      });
    }),
});
