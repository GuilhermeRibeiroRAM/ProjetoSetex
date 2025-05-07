import { TOKENS } from '@/business/di/tokens';
import { IDeleteSensorStatusRepository } from '@/business/interfaces/repository/sensor-status/delete.interface';
import { IDelete } from '@/business/interfaces/use-cases/base/delete.interface';
import { Inject } from '@nestjs/common';

export default class DeleteSensorStatus implements IDelete {
  constructor(
    @Inject(TOKENS.DeleteSensorStatusRepository)
    private readonly deleteSensorStatusRepository: IDeleteSensorStatusRepository,
  ) {}
  async execute(id: string): Promise<boolean> {
    const response = await this.deleteSensorStatusRepository.execute(id);
    return response;
  }
}
