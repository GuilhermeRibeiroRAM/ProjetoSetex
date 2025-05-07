import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetMachineVelocityPagedRepository } from '@/business/interfaces/repository/machine-velocity/get-paged.interface';
import { IGetPaged } from '@/business/interfaces/use-cases/base/get-paged.interface';
import { IMachineVelocity } from '@/business/model/machine-velocity.interface';
import { Inject } from '@nestjs/common';

export default class GetPagedMachineVelocity
  implements IGetPaged<IMachineVelocity>
{
  constructor(
    @Inject(TOKENS.GetMachineVelocityPagedRepository)
    private readonly getMachineVelocityPagedRepository: IGetMachineVelocityPagedRepository,
  ) {}
  async execute(
    options: IQueryOptions,
  ): Promise<IPagedResult<IMachineVelocity>> {
    const response =
      await this.getMachineVelocityPagedRepository.execute(options);
    return response;
  }
}
