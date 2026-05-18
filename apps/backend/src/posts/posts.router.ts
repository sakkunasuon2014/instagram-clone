import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from 'nestjs-trpc-v2';
import {
  CreatePostInput,
  createPostSchema,
  findAllPostsSchema,
  FindAllPostsInput,
  LikePostInput,
  likePostSchema,
  postSchema,
  SavePostInput,
  savePostSchema,
} from '@repo/trpc/schemas';
import { PostsService } from './posts.service';
import z from 'zod';
import { AuthTrpcMiddleware } from 'src/auth/auth-trpc.middleware';
import { AppContext } from 'src/app-context.interface';

@Router()
@UseMiddlewares(AuthTrpcMiddleware)
export class PostsRouter {
  constructor(private readonly postService: PostsService) {}

  @Mutation({ input: createPostSchema, output: postSchema })
  async create(
    @Input() createPostInput: CreatePostInput,
    @Ctx() context: AppContext,
  ) {
    return this.postService.create(createPostInput, context.user);
  }

  @Query({ input: findAllPostsSchema, output: z.array(postSchema) })
  async findAll(@Input() input: FindAllPostsInput, @Ctx() context: AppContext) {
    return this.postService.findAll(context.user.id, input.userId);
  }
  @Mutation({ input: likePostSchema })
  async likePost(
    @Input() likePostInput: LikePostInput,
    @Ctx() context: AppContext,
  ) {
    return this.postService.likePost(likePostInput.postId, context.user.id);
  }

  @Mutation({ input: savePostSchema })
  async savePost(
    @Input() savePostInput: SavePostInput,
    @Ctx() context: AppContext,
  ) {
    return this.postService.savePost(savePostInput.postId, context.user.id);
  }

  @Query({ output: z.array(postSchema) })
  async getSavedPosts(@Ctx() context: AppContext) {
    return this.postService.getSavedPosts(context.user.id);
  }
}
