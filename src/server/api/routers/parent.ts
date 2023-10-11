import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const parentRouter = createTRPCRouter({
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
  getOne: protectedProcedure
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
  getManyByKid: protectedProcedure
    .input(
      z.object({
        kidId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.parent.findMany({
        where: {
          kidIDs: {
            has: input.kidId,
          },
        },
      });
    }),
  getManyByGroup: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        page: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const count = await ctx.db.parent.count({
        where: {
          groupId: input.groupId,
        },
      });
      const parents = await ctx.db.parent.findMany({
        where: {
          groupId: input.groupId,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 20,
        skip: input.page && (input.page - 1) * 20,
        include: {
          kids: true,
        },
      });

      return {
        count,
        parents,
      };
    }),
  getInfiniteByGroup: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        groupId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, groupId, limit, cursor, skip } = input;

      const items = await ctx.db.parent.findMany({
        where: {
          groupId,
          OR: [
            {
              firstName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              middleName: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          kids: true,
        },
        take: limit + 1,
        skip,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,

        nextCursor,
      };
    }),
  getCountByGroup: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.parent.count({
        where: {
          groupId: input.groupId,
        },
      });
    }),
});
