import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetPagedRepository } from '@/business/interfaces/repository/base/get-paged.interface';
import { IGetMachineVelocityPagedRepository } from '@/business/interfaces/repository/machine-velocity/get-paged.interface';
import { IMachineVelocity } from '@/business/model/machine-velocity.interface';
import { machineVelocity } from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';

export class GetMachineVelocityPagedRepository
  implements IGetMachineVelocityPagedRepository
{
  private getPagedRepository: IGetPagedRepository<IMachineVelocity>;
  constructor(
    @Inject(TOKENS.GetPagedRepository)
    private factoryGetPagedRepository: (
      table: Table,
    ) => IGetPagedRepository<IMachineVelocity>,
  ) {
    this.getPagedRepository = this.factoryGetPagedRepository(machineVelocity);
  }

  async execute(
    options: IQueryOptions,
  ): Promise<IPagedResult<IMachineVelocity>> {
    const users = await this.getPagedRepository.execute(options);

    return users;
  }
}
