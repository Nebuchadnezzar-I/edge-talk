import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from 'zod';

export const negotiationRouter = createTRPCRouter({

    getAll: publicProcedure.query(async ({ ctx }) => {
        const negotiations = await ctx.db.negotiation.findMany();
        return negotiations;
    }),

    removeById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const negotiation = await ctx.db.negotiation.delete({
            where: {
                id: input.id,
            },
        });

        return negotiation;
    }),

    getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
        const negotiation = await ctx.db.negotiation.findUnique({
            where: {
                id: input.id,
            },
        });

        return negotiation;
    }),

    create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
        const negotiation = await ctx.db.negotiation.create({
            data: {
                name: input.name,
            },
        });
        return negotiation;
    }),

});
