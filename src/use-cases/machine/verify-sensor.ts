import { TOKENS } from '@/business/di/tokens';
import { IGetMachineBySensorIdentifier } from '@/business/interfaces/use-cases/machine/get-by-sensor-code.interface';
import { IVerifySensor } from '@/business/interfaces/use-cases/machine/verify-sensor.interface';
import { BadRequestException, Inject } from '@nestjs/common';

export default class VerifySensor implements IVerifySensor {
  constructor(
    @Inject(TOKENS.GetMachineBySensorIdentifierService)
    private readonly getMachineBySensorIdentifierService: IGetMachineBySensorIdentifier,
  ) {}

  // TODO - Criar arquivo de resources e enviar os erros para a aplicação
  async execute(sensorIdentifier: string): Promise<string | null> {
    let machine;
    if (sensorIdentifier)
      machine =
        await this.getMachineBySensorIdentifierService.execute(
          sensorIdentifier,
        );
    if (machine) return machine.id;
    return null;
  }
}
