import { initTRPC } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";

const t = initTRPC.create({ transformer: superjson });
const publicProcedure = t.procedure;

const appRouter = t.router({
  postsRouter: t.router({
    create: publicProcedure.input(z.object({
      caption: z.string().min(1, 'caption is required'),
      image: z.string().min(1, 'image is required'),
    })).output(z.object({
      id: z.number(),
      user: z.object({
        username: z.string(),
        avatar: z.string(),
      }),
      image: z.string(),
      caption: z.string(),
      likes: z.number(),
      comments: z.number(),
      timestamp: z.string(),
      isLiked: z.boolean().optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findAll: publicProcedure.output(z.array(z.object({
      id: z.number(),
      user: z.object({
        username: z.string(),
        avatar: z.string(),
      }),
      image: z.string(),
      caption: z.string(),
      likes: z.number(),
      comments: z.number(),
      timestamp: z.string(),
      isLiked: z.boolean().optional(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    likePost: publicProcedure.input(z.object({
      postId: z.number(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

