import { AuthService } from '@mguay/nestjs-better-auth';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  MiddlewareOptions,
  MiddlewareResponse,
  TRPCMiddleware,
} from 'nestjs-trpc-v2';

@Injectable()
export class AuthTrpcMiddleware implements TRPCMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(
    opts: MiddlewareOptions<{
      req: { headers: Record<string, string> };
      res: any;
    }>,
  ): Promise<MiddlewareResponse> {
    const { ctx, next } = opts;
    const session = await this.authService.api.getSession({
      headers: ctx.req.headers,
    });
    if (session?.user && session.session) {
      return next({
        ctx: {
          ...ctx,
          user: session.user,
          session: session.session,
        },
      });
    }
    throw new UnauthorizedException('Unauthorized');
  }
}
