import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '../database/database.module';
import { CreateStoryInput, StoryGroup } from '@repo/trpc/schemas';
import { story } from './schemas/schema';
import { follow } from '../auth/schema';
import { and, eq, gt, inArray } from 'drizzle-orm';

@Injectable()
export class StoriesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async create(createStoryInput: CreateStoryInput, userId: string) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await this.database.insert(story).values({
      userId,
      image: createStoryInput.image,
      createdAt: new Date(),
      expiresAt,
    });
  }

  async getStories(userId: string): Promise<StoryGroup[]> {
    const followingIds = await this.database
      .select({ id: follow.followingId })
      .from(follow)
      .where(eq(follow.followerId, userId));

    const userIds = [userId, ...followingIds.map((f) => f.id)];

    const stories = await this.database.query.story.findMany({
      where: and(
        gt(story.expiresAt, new Date()),
        inArray(story.userId, userIds),
      ),
      with: { user: true },
    });

    const storyGroups = new Map<string, StoryGroup>();
    for (const s of stories) {
      if (!storyGroups.has(s.userId)) {
        storyGroups.set(s.userId, {
          userId: s.userId,
          username: s.user.name,
          avatar: s.user.image || '',
          stories: [],
        });
      }
      const group = storyGroups.get(s.userId);
      group?.stories.push({
        id: s.id,
        user: {
          id: s.user.id,
          username: s.user.name,
          avatar: s.user.image || '',
        },
        image: s.image,
        createdAt: s.createdAt.toISOString(),
        expiresAt: s.expiresAt.toISOString(),
      });
    }
    return Array.from(storyGroups.values());
  }
}
