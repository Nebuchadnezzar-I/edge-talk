import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sessionRouter = createTRPCRouter({

    getAll: publicProcedure
    .input(z.object({
        negotiationID: z.string(),
    }))
    .query(async ({ ctx, input }) => {
        const sessions = await ctx.db.session.findMany({
            where: {
                negotiationId: input.negotiationID
            },
        });

        return sessions;
    }),

    newSession: publicProcedure
    .input(z.object({
        negotiationID: z.string(),
        name: z.string().min(1),
        qaa: z.array(z.object({
            q: z.string(),
            a: z.string()
        }))
    }))
    .mutation(async ({ ctx, input }) => {
        const session = await ctx.db.session.create({
            data: {
                name: input.name,
                negotiationId: input.negotiationID,
                questionAnswers: JSON.stringify(input.qaa)
            },
        });
        return session;
    }),
});
