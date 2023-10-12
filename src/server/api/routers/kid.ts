import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const kidRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        middleName: z.string(),
        adress: z.string(),
        omsPolicy: z.string(),
        birthDate: z.string(),
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
          adress: input.adress,
          omsPolicy: input.omsPolicy,
          birthDate: input.birthDate,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        kidId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        middleName: z.string(),
        adress: z.string(),
        omsPolicy: z.string(),
        birthDate: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.kid.update({
        where: {
          id: input.kidId,
        },
        data: {
          updatedById: ctx.session.user.id,
          firstName: input.firstName,
          lastName: input.lastName,
          middleName: input.middleName,
          adress: input.adress,
          omsPolicy: input.omsPolicy,
          birthDate: input.birthDate,
        },
        include: {
          createdBy: true,
          updatedBy: true,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        kidId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.kid.delete({
        where: {
          id: input.kidId,
        },
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ kidId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.kid.findUnique({
        where: {
          id: input.kidId,
        },
        include: {
          createdBy: true,
          updatedBy: true,
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
      return ctx.db.kid.findMany({
        where: {
          groupId: input.groupId,
        },
        orderBy: {
          lastName: "asc",
        },
      });
    }),
});
