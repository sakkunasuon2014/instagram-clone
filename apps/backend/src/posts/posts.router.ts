import { Input, Mutation, Query, Router } from 'nestjs-trpc-v2';
import {
  CreatePostInput,
  createPostSchema,
  postSchema,
} from './schemas/trpc.schema';
import { PostsService } from './posts.service';
import z from 'zod';

@Router()
export class PostsRouter {
  constructor(private readonly postService: PostsService) {}

  @Mutation({ input: createPostSchema, output: postSchema })
  async create(@Input() createPostInput: CreatePostInput) {
    return this.postService.create(
      createPostInput,
      'iryRVI3SqCrYOviAEye7trbW93wPl6cI',
    );
  }

  @Query({ output: z.array(postSchema) })
  async findAll() {
    return this.postService.findAll();
  }
}
