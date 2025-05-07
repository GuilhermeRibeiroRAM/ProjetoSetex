import { TOKENS } from '@/business/di/tokens';
import { IDeleteRepository } from '@/business/interfaces/repository/base/delete.interface';
import { IDeleteSensorStatusRepository } from '@/business/interfaces/repository/sensor-status/delete.interface';
import { sensorStatus } from '@/database/drizzle/schema/sensor-status';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';

export class DeleteSensorStatusRepository
  implements IDeleteSensorStatusRepository
{
  private deleteRepository: IDeleteRepository;
  constructor(
    @Inject(TOKENS.DeleteRepository)
    private factoryDeleteRepository: (table: Table) => IDeleteRepository,
  ) {
    this.deleteRepository = this.factoryDeleteRepository(sensorStatus);
  }

  async execute(id: string): Promise<boolean> {
    const response = await this.deleteRepository.execute(id);

    return response;
  }
}
