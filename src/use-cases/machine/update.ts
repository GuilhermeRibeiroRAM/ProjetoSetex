import { customResponse } from '@/api/utils/custom-response';
import { CustomResponseViewModel } from '@/api/view-models/common/custom-response';
import { TOKENS } from '@/business/di/tokens';
import { IGetMachineByNameRepository } from '@/business/interfaces/repository/machine/get-by-name.interface';
import { IUpdateMachineRepository } from '@/business/interfaces/repository/machine/update.interface';
import { IUpdate } from '@/business/interfaces/use-cases/base/update.interface';
import { IUpdateMachine } from '@/business/interfaces/use-cases/machine/update.interface';
import { IVerifySensor } from '@/business/interfaces/use-cases/machine/verify-sensor.interface';
import { IMachine } from '@/business/model/machine.interface';
import { BadRequestException, Inject } from '@nestjs/common';

export default class UpdateMachine implements IUpdateMachine<IMachine> {
  constructor(
    @Inject(TOKENS.UpdateMachineRepository)
    private readonly updateMachineRepository: IUpdateMachineRepository,
    @Inject(TOKENS.VerifySensorService)
    private readonly verifySensorService: IVerifySensor,
    @Inject(TOKENS.GetMachineByNameRepository)
    private readonly GetMachineByName: IGetMachineByNameRepository,
  ) {}

  async execute(
    id: string,
    data: Partial<IMachine>,
  ): Promise<CustomResponseViewModel<boolean | null>> {
    const machineSensor1 = await this.verifySensorService.execute(
      data.sensorIdentifier,
    );
    const machineSensor2 = await this.verifySensorService.execute(
      data.sensorIdentifier2,
    );

    const machine = await this.GetMachineByName.execute(data.name);

    if (
      (machineSensor1 && machineSensor1 != id) ||
      (machineSensor2 && machineSensor2 != id) ||
      (machine && machine.id != id)
    ) {
      return {
        status: 500,
        error: {
          generic: {
            validationError: ['Erro criando máquina'],
          },
          fields: {
            machineSensor1:
              machineSensor1 && machineSensor1 != id
                ? 'Sensor já está atrelado a uma máquina'
                : null,
            machineSensor2:
              machineSensor2 && machineSensor2 != id
                ? 'Sensor já está atrelado a uma máquina'
                : null,
            nameAlreadyExists:
              machine && machine.id != id ? 'Nome já utilizado' : null,
          },
        },
      };
    }
    const response = await this.updateMachineRepository.execute(id, data);
    return customResponse<boolean>(response);
  }
}
