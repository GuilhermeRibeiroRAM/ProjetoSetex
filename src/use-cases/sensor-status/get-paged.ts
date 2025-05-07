import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetSensorStatusPagedRepository } from '@/business/interfaces/repository/sensor-status/get-paged.interface';
import { IGetPaged } from '@/business/interfaces/use-cases/base/get-paged.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import { Inject } from '@nestjs/common';

export default class GetPagedSensorStatus implements IGetPaged<ISensorStatus> {
  constructor(
    @Inject(TOKENS.GetSensorStatusPagedRepository)
    private readonly getSensorStatusPagedRepository: IGetSensorStatusPagedRepository,
  ) {}
  async execute(options: IQueryOptions): Promise<IPagedResult<ISensorStatus>> {
    const response = await this.getSensorStatusPagedRepository.execute(options);
    return response;
  }
}
