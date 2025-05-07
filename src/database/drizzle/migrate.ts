import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import pg from 'pg';
import { exit } from 'process';
import * as config from '../../../drizzle.config';
import * as allSchema from './schema';

(async () => {
  const pool = new pg.Pool({
    host: config.default.dbCredentials.host,
    user: config.default.dbCredentials.user,
    password: config.default.dbCredentials.password,
    database: config.default.dbCredentials.database,
    port: config.default.dbCredentials.port,
  });
  let db: NodePgDatabase<typeof allSchema> | null = null;
  db = drizzle(pool, {
    schema: {
      ...allSchema,
    },
  });

  // Look for migrations in the src/database/drizzle/migrations folder
  const migrationPath = path.join(
    process.cwd(),
    'src/database/drizzle/migrations',
  );

  // Run the migrations
  await migrate(db, { migrationsFolder: migrationPath });

  console.log('Migration complete');
  exit(0);
})();
