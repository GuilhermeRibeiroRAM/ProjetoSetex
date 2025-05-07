import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetPagedRepository } from '@/business/interfaces/repository/base/get-paged.interface';
import { IGetSensorStatusPagedRepository } from '@/business/interfaces/repository/sensor-status/get-paged.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import { sensorStatus } from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';

export class GetISensorStatusPagedRepository
  implements IGetSensorStatusPagedRepository
{
  private getPagedRepository: IGetPagedRepository<ISensorStatus>;
  constructor(
    @Inject(TOKENS.GetPagedRepository)
    private factoryGetPagedRepository: (
      table: Table,
    ) => IGetPagedRepository<ISensorStatus>,
  ) {
    this.getPagedRepository = this.factoryGetPagedRepository(sensorStatus);
  }

  async execute(options: IQueryOptions): Promise<IPagedResult<ISensorStatus>> {
    const users = await this.getPagedRepository.execute(options);

    return users;
  }
}
