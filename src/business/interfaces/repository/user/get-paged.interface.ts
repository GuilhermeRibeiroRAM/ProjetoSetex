import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IUser } from '@/business/model/user.interface';

export interface IGetUserPagedRepository {
  execute(options: IQueryOptions): Promise<IPagedResult<IUser>>;
}
