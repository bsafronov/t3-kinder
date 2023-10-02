import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const parentRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ parentId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.parent.findUnique({
        where: {
          id: input.parentId,
        },
        include: {
          createdBy: true,
          updatedBy: true,
        },
      });
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        kidId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.parent.findMany({
        where: {
          groupId: input.groupId,
          kidIDs: {
            has: input.kidId,
          },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        middleName: z.string(),
        role: z.string(),
        groupId: z.string(),
        kidIDs: z.array(z.string()),
        phoneNumbers: z.array(z.string()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.parent.create({
        data: {
          createdById: ctx.session.user.id,
          groupId: input.groupId,
          role: input.role,
          kidIDs: input.kidIDs,
          firstName: input.firstName,
          lastName: input.lastName,
          middleName: input.middleName,
          phoneNumbers: input.phoneNumbers,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        parentId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        middleName: z.string(),
        role: z.string(),
        kidIDs: z.array(z.string()).optional(),
        phoneNumbers: z.array(z.string()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.parent.update({
        where: {
          id: input.parentId,
        },
        data: {
          updatedById: ctx.session.user.id,
          firstName: input.firstName,
          lastName: input.lastName,
          middleName: input.middleName,
          role: input.role,
          kidIDs: input.kidIDs,
          phoneNumbers: input.phoneNumbers,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        parentId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.parent.delete({
        where: {
          id: input.parentId,
        },
      });
    }),
});
