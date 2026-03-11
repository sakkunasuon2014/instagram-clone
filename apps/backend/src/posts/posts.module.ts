import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsRouter } from './posts.router';
import { UsersModule } from 'src/auth/users/users.module';
import { DatabaseModule } from '../database/database.module';
import { AuthTrpcMiddleware } from '../auth/auth-trpc.middleware';

@Module({
  imports: [UsersModule, DatabaseModule],
  providers: [PostsService, PostsRouter, AuthTrpcMiddleware],
})
export class PostsModule {}
