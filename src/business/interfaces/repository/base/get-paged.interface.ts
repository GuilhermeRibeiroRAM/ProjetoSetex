import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export interface IGetPagedRepository<T> {
  db: NodePgDatabase;
  execute(options: IQueryOptions): Promise<IPagedResult<T>>;
}
