import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IMachineVelocity } from '@/business/model/machine-velocity.interface';

export interface IGetMachineVelocityByMachineIdRepository {
  execute(
    machineId: string,
    options: IQueryOptions,
  ): Promise<IPagedResult<IMachineVelocity>>;
}
