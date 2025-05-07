import { TOKENS } from '@/business/di/tokens';
import { IGetLastSensorStatusByMachineIdRepository } from '@/business/interfaces/repository/sensor-status/get-last-by-machine-id.interface';
import { IGetLastSensorStatusByMachineId } from '@/business/interfaces/use-cases/sensor-status/get-last-by-machine-id.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import { Inject } from '@nestjs/common';

export default class GetLastSensorStatusByMachineId
  implements IGetLastSensorStatusByMachineId
{
  constructor(
    @Inject(TOKENS.GetLastSensorStatusByMachineIdRepository)
    private readonly getLastSensorStatusByMachineIdRepository: IGetLastSensorStatusByMachineIdRepository,
  ) {}
  async execute(id: string): Promise<ISensorStatus> {
    const response =
      await this.getLastSensorStatusByMachineIdRepository.execute(id);
    return response;
  }
}
