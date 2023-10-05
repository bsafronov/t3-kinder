import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const vaccinationRouter = createTRPCRouter({
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
  update: protectedProcedure
    .input(
      z.object({
        vaccinationId: z.string(),
        date: z.string(),
        tagId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.vaccination.update({
        where: {
          id: input.vaccinationId,
        },
        data: {
          updatedById: ctx.session.user.id,
          date: input.date,
          tagId: input.tagId,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        vaccinationId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.vaccination.delete({
        where: {
          id: input.vaccinationId,
        },
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ vaccinationId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.vaccination.findUnique({
        where: {
          id: input.vaccinationId,
        },
        include: {
          tag: true,
        },
      });
    }),
  getManyByKid: protectedProcedure
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
  getManyByGroup: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.vaccination.findMany({
        where: {
          groupId: input.groupId,
        },
      });
    }),
});
