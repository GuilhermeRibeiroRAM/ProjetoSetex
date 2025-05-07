import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetMachineVelocityByMachineIdRepository } from '@/business/interfaces/repository/machine-velocity/get-by-machine-id.interface';
import { IGetMachineVelocityByMachineId } from '@/business/interfaces/use-cases/machine-velocity/get-by-machine-id.interface';
import { IMachineVelocity } from '@/business/model/machine-velocity.interface';
import { Inject } from '@nestjs/common';

export default class GetMachineVelocityByMachineId
  implements IGetMachineVelocityByMachineId
{
  constructor(
    @Inject(TOKENS.GetMachineVelocityByMachineIdRepository)
    private readonly getMachineVelocityByMachineIdRepository: IGetMachineVelocityByMachineIdRepository,
  ) {}
  async execute(
    machineId: string,
    options: IQueryOptions,
  ): Promise<IPagedResult<IMachineVelocity>> {
    const response = await this.getMachineVelocityByMachineIdRepository.execute(
      machineId,
      options,
    );
    return response;
  }
}
