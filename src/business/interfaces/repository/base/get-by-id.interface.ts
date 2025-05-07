import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export interface IGetByIdRepository<T> {
  db: NodePgDatabase;
  execute(id: string): Promise<T | null>;
}
