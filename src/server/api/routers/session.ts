import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sessionRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const sessions = await ctx.db.session.findMany();
        return sessions;
    }),
});
