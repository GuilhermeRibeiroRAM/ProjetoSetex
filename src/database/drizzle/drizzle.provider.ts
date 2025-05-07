import { TOKENS } from '@/business/di/tokens';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as config from '../../../drizzle.config';
import * as schema from './schema';

export const drizzleProvider = [
  {
    provide: TOKENS.DrizzleAsyncProvider,
    useFactory: async () => {
      const pool = new Pool({
        host: config.default.dbCredentials.host,
        user: config.default.dbCredentials.user,
        password: config.default.dbCredentials.password,
        database: config.default.dbCredentials.database,
        port: config.default.dbCredentials.port,
      });

      return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
    },
  },
];
