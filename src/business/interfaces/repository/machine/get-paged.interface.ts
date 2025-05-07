import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IMachine } from '@/business/model/machine.interface';

export interface IGetMachinePagedRepository {
  execute(options: IQueryOptions): Promise<IPagedResult<IMachine>>;
}
