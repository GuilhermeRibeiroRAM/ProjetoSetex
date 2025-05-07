import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';

export interface IGetPaged<T> {
  execute(options: IQueryOptions): Promise<IPagedResult<T>>;
}
