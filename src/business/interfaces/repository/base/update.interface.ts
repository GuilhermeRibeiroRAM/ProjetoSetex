import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export interface IUpdateRepository<T> {
  db: NodePgDatabase;
  execute(id: string, data: Partial<T>): Promise<boolean>;
}
