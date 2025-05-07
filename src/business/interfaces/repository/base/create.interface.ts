import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export interface ICreateRepository<T> {
  db: NodePgDatabase;
  execute(data: T): Promise<string>;
}
