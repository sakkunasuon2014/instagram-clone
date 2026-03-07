import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import * as schema from './schema';

export const auth = betterAuth({
  database: drizzleAdapter(
    {},
    {
      provider: 'pg',
      schema,
    },
  ),
});
