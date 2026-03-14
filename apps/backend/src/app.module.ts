import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DATABASE_CONNECTION } from './database/database-connection';
import { AuthGuard, AuthModule } from '@mguay/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AppController } from './app.controller';
import * as schema from './auth/schema';
import { APP_GUARD } from '@nestjs/core';
import { PostsModule } from './posts/posts.module';
import { TRPCModule } from 'nestjs-trpc-v2';
import { UsersModule } from './auth/users/users.module';
import { UploadModule } from './upload/upload.module';
import { AppContext } from './app.context';
import { AuthTrpcMiddleware } from './auth/auth-trpc.middleware';
import superjson from 'superjson';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/trpc/src/server',
      context: AppContext,
      basePath: '/api/trpc',
      transformer: {
        runtime: superjson,
        importName: 'superjson',
        importPath: 'superjson',
      },
    }),
    AuthModule.forRootAsync({
      imports: [DatabaseModule, ConfigModule],
      useFactory: (database: NodePgDatabase, configService: ConfigService) => ({
        auth: betterAuth({
          database: drizzleAdapter(database, {
            provider: 'pg',
            schema: {
              ...schema,
            },
          }),
          emailAndPassword: {
            enabled: true,
          },
          trustedOrigins: [configService.getOrThrow('UI_URL')],
        }),
      }),
      inject: [DATABASE_CONNECTION, ConfigService],
    }),
    PostsModule,
    UsersModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AuthTrpcMiddleware,
    AppContext,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
