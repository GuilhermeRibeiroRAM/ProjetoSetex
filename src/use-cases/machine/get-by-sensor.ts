import { TOKENS } from '@/business/di/tokens';
import { IGetMachineBySensorIdentifierRepository } from '@/business/interfaces/repository/machine/get-by-sensor.interface';
import { IGetMachineBySensorIdentifier } from '@/business/interfaces/use-cases/machine/get-by-sensor-code.interface';
import { IMachine } from '@/business/model/machine.interface';
import { Inject } from '@nestjs/common';

export default class GetMachineBySensorIdentifier
  implements IGetMachineBySensorIdentifier
{
  constructor(
    @Inject(TOKENS.GetMachineBySensorIdentifierRepository)
    private readonly getMachineBySensorRepository: IGetMachineBySensorIdentifierRepository,
  ) {}
  async execute(sensor: string): Promise<IMachine> {
    const response = await this.getMachineBySensorRepository.execute(sensor);
    return response;
  }
}
