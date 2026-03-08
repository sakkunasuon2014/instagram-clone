import { z } from 'zod';

export const createPostSchema = z.object({
  caption: z.string().min(1, 'caption is required'),
  image: z.string().min(1, 'image is required'),
});

export const postSchema = z.object({
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
});

export type Post = z.infer<typeof postSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
