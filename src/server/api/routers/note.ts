import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),
        kidId: z.string(),
        description: z.string(),
        tagIDs: z.array(z.string()),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.note.create({
        data: {
          createdById: ctx.session.user.id,
          groupId: input.groupId,
          kidId: input.kidId,
          description: input.description,
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
        noteId: z.string(),
        description: z.string(),
        tagIDs: z.array(z.string()),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.note.update({
        where: {
          id: input.noteId,
        },
        data: {
          updatedById: ctx.session.user.id,
          description: input.description,
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
        noteId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.note.delete({
        where: {
          id: input.noteId,
        },
      });
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        noteId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.note.findUnique({
        where: {
          id: input.noteId,
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
      return ctx.db.note.findMany({
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
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.note.findMany({
        where: {
          groupId: input.groupId,
        },
        include: {
          kid: {
            select: {
              firstName: true,
              lastName: true,
              middleName: true,
            },
          },
          createdBy: true,
          updatedBy: true,
          tags: true,
        },
      });
    }),
  getInfiniteByGroup: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        tagIDs: z.array(z.string()),
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        groupId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { tagIDs, search, groupId, limit, cursor, skip } = input;

      const items = await ctx.db.note.findMany({
        where: {
          groupId,
          description: {
            contains: search,
            mode: "insensitive",
          },
          tagIDs: {
            hasEvery: tagIDs,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          kid: true,
          tags: true,
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
      return ctx.db.note.count({
        where: {
          groupId: input.groupId,
        },
      });
    }),
});
