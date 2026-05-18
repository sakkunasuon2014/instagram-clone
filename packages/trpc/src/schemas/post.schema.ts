import { z } from "zod";

export const createPostSchema = z.object({
  caption: z.string().min(1, "caption is required"),
  image: z.string().min(1, "image is required"),
});

export const postSchema = z.object({
  id: z.number(),
  user: z.object({
    username: z.string(),
    id: z.string(),
    avatar: z.string(),
  }),
  image: z.string(),
  caption: z.string(),
  likes: z.number(),
  comments: z.number(),
  timestamp: z.string(),
  isLiked: z.boolean().optional(),
  isSaved: z.boolean().optional(),
});

export const likePostSchema = z.object({
  postId: z.number(),
});

export const savePostSchema = z.object({
  postId: z.number(),
});

export const findAllPostsSchema = z.object({
  userId: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type LikePostInput = z.infer<typeof likePostSchema>;
export type SavePostInput = z.infer<typeof savePostSchema>;
export type FindAllPostsInput = z.infer<typeof findAllPostsSchema>;
