import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePostInput, Post } from '@repo/trpc/schemas';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '../database/database.module';
import { like, post, savedPost } from './schemas/schema';
import { follow } from '../auth/schema';
import { and, desc, eq, inArray } from 'drizzle-orm';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}
  async create(
    createPostInput: CreatePostInput,
    user: { id: string; name: string | null; image: string | null },
  ) {
    const [createdPost] = await this.database
      .insert(post)
      .values({
        userId: user.id,
        caption: createPostInput.caption,
        image: createPostInput.image,
        createdAt: new Date(),
      })
      .returning();

    return {
      id: createdPost.id,
      user: {
        username: user.name || '',
        id: user.id,
        avatar: user.image || '',
      },
      image: createdPost.image,
      caption: createdPost.caption,
      likes: 0,
      comments: 0,
      timestamp: createdPost.createdAt.toISOString(),
    };
  }

  private async getFollowedUserIds(userId: string): Promise<string[]> {
    const following = await this.database
      .select({ id: follow.followingId })
      .from(follow)
      .where(eq(follow.followerId, userId));
    return [userId, ...following.map((f) => f.id)];
  }

  async findAll(userId: string, postUserId?: string): Promise<Post[]> {
    try {
      let whereClause:
        | ReturnType<typeof eq>
        | ReturnType<typeof inArray>
        | undefined;
      if (postUserId) {
        whereClause = eq(post.userId, postUserId);
      } else {
        const followedUserIds = await this.getFollowedUserIds(userId);
        whereClause = inArray(post.userId, followedUserIds);
      }
      const posts = await this.database.query.post.findMany({
        where: whereClause,
        with: { user: true, likes: true, comments: true, savedPosts: true },
        orderBy: [desc(post.createdAt)],
      });
      return posts.map((savedPost) => ({
        id: savedPost.id,
        user: {
          username: savedPost.user.name,
          id: savedPost.user.id,
          avatar: savedPost.user.image || '',
        },
        image: savedPost.image,
        likes: savedPost.likes.length,
        caption: savedPost.caption,
        timestamp: savedPost.createdAt.toISOString(),
        comments: savedPost.comments.length,
        isLiked: savedPost.likes.some((like) => like.userId === userId),
        isSaved: savedPost.savedPosts?.some((sp) => sp.userId === userId),
      }));
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Failed to fetch posts: ${err.message}`, err.stack);
      throw error;
    }
  }

  async savePost(postId: number, userId: string) {
    const existingSave = await this.database.query.savedPost.findFirst({
      where: and(eq(savedPost.postId, postId), eq(savedPost.userId, userId)),
    });

    if (existingSave) {
      await this.database
        .delete(savedPost)
        .where(eq(savedPost.id, existingSave.id));
    } else {
      await this.database.insert(savedPost).values({
        postId,
        userId,
        createdAt: new Date(),
      });
    }
  }

  async getSavedPosts(userId: string): Promise<Post[]> {
    const saved = await this.database.query.savedPost.findMany({
      where: eq(savedPost.userId, userId),
      with: {
        post: {
          with: {
            user: true,
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: [desc(savedPost.createdAt)],
    });
    return saved.map((sp) => ({
      id: sp.post.id,
      user: {
        username: sp.post.user.name,
        id: sp.post.user.id,
        avatar: sp.post.user.image || '',
      },
      image: sp.post.image,
      caption: sp.post.caption,
      likes: sp.post.likes.length,
      timestamp: sp.post.createdAt.toISOString(),
      comments: sp.post.comments.length,
      isLiked: sp.post.likes.some((like) => like.userId === userId),
      isSaved: true,
    }));
  }

  async likePost(postId: number, userId: string) {
    const existingLike = await this.database.query.like.findFirst({
      where: and(eq(like.postId, postId), eq(like.userId, userId)),
    });
    if (existingLike) {
      await this.database.delete(like).where(eq(like.id, existingLike.id));
    } else {
      await this.database.insert(like).values({
        postId,
        userId,
      });
    }
  }
}
