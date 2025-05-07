import { TOKENS } from '@/business/di/tokens';
import { IGetByIdRepository } from '@/business/interfaces/repository/base/get-by-id.interface';
import { IGetSensorStatusByIdRepository } from '@/business/interfaces/repository/sensor-status/get-by-id.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import { sensorStatus } from '@/database/drizzle/schema/sensor-status';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';

export class GetSensorStatusByIdRepository
  implements IGetSensorStatusByIdRepository
{
  private getByIdRepository: IGetByIdRepository<ISensorStatus>;
  constructor(
    @Inject(TOKENS.GetByIdRepository)
    private factoryGetByIdRepository: (
      table: Table,
    ) => IGetByIdRepository<ISensorStatus>,
  ) {
    this.getByIdRepository = this.factoryGetByIdRepository(sensorStatus);
  }

  async execute(id: string): Promise<ISensorStatus | null> {
    const sensorStatus = await this.getByIdRepository.execute(id);

    return sensorStatus;
  }
}
