import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePostInput, Post } from '@repo/trpc/schemas';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '../database/database.module';
import { like, post } from './schemas/schema';
import { UsersService } from '../auth/users/users.service';
import { and, desc, eq } from 'drizzle-orm';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly userService: UsersService,
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
        avatar: user.image || '',
      },
      image: createdPost.image,
      caption: createdPost.caption,
      likes: 0,
      comments: 0,
      timestamp: createdPost.createdAt.toISOString(),
    };
  }

  async findAll(userId: string): Promise<Post[]> {
    try {
      const posts = await this.database.query.post.findMany({
        with: { user: true, likes: true },
        orderBy: [desc(post.createdAt)],
      });
      return posts.map((savedPost) => ({
        id: savedPost.id,
        user: {
          username: savedPost.user.name,
          avatar: savedPost.user.image || '',
        },
        image: savedPost.image,
        likes: savedPost.likes.length,
        caption: savedPost.caption,
        timestamp: savedPost.createdAt.toISOString(),
        comments: 0,
        isLiked: savedPost.likes.some((like) => like.userId === userId),
      }));
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Failed to fetch posts: ${err.message}`, err.stack);
      throw error;
    }
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
