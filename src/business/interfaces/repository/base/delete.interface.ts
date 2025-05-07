import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export interface IDeleteRepository {
  db: NodePgDatabase;
  execute(id: string): Promise<boolean>;
}
