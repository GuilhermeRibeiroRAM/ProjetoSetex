import { TOKENS } from '@/business/di/tokens';
import { ISensorStatusRepository } from '@/business/interfaces/repository/sensor-status/update.interface';
import { IUpdateSensorStatus } from '@/business/interfaces/use-cases/sensor-status/update.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import { Inject } from '@nestjs/common';

export default class UpdateSensorStatus implements IUpdateSensorStatus {
  constructor(
    @Inject(TOKENS.UpdateSensorStatusRepository)
    private readonly updateSensorStatusRepository: ISensorStatusRepository,
  ) {}
  async execute(id: number, data: Partial<ISensorStatus>): Promise<boolean> {
    const response = await this.updateSensorStatusRepository.execute(id, data);
    return response;
  }
}
