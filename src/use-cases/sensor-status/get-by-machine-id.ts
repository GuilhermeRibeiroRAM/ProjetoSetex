import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetSensorStatusByMachineIdRepository } from '@/business/interfaces/repository/sensor-status/get-by-machine-id.interface';
import { IGetSensorStatusByMachineId } from '@/business/interfaces/use-cases/sensor-status/get-by-machine-id.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import { Inject } from '@nestjs/common';

export default class GetSensorStatusByMachineId
  implements IGetSensorStatusByMachineId
{
  constructor(
    @Inject(TOKENS.GetSensorStatusByMachineIdRepository)
    private readonly getSensorStatusByMachineIdRepository: IGetSensorStatusByMachineIdRepository,
  ) {}
  async execute(
    machineId: string,
    options: IQueryOptions,
  ): Promise<IPagedResult<ISensorStatus>> {
    const response = await this.getSensorStatusByMachineIdRepository.execute(
      machineId,
      options,
    );
    return response;
  }
}
