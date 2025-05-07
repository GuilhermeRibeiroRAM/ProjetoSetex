import { TOKENS } from '@/business/di/tokens';
import { IGetSensorStatusByIdRepository } from '@/business/interfaces/repository/sensor-status/get-by-id.interface';
import { IGetById } from '@/business/interfaces/use-cases/base/get-by-id.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import { Inject } from '@nestjs/common';

export default class GetSensorStatusByIdRepositoryById
  implements IGetById<ISensorStatus>
{
  constructor(
    @Inject(TOKENS.GetSensorStatusByIdRepository)
    private readonly getSensorStatusByIdRepository: IGetSensorStatusByIdRepository,
  ) {}
  async execute(id: string): Promise<ISensorStatus> {
    const response = await this.getSensorStatusByIdRepository.execute(id);
    return response;
  }
}
