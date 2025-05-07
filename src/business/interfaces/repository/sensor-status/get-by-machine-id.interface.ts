import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { ISensorStatus } from '@/business/model/sensor-status.interface';

export interface IGetSensorStatusByMachineIdRepository {
  execute(
    machineId: string,
    options: IQueryOptions,
  ): Promise<IPagedResult<ISensorStatus>>;
}
