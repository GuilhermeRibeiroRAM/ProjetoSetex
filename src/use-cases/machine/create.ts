import { customResponse } from '@/api/utils/custom-response';
import { CustomResponseViewModel } from '@/api/view-models/common/custom-response';
import { TOKENS } from '@/business/di/tokens';
import { MachineStatusEnum } from '@/business/enums/machine-status.enum';
import {
  AppException,
  ICustomError,
} from '@/business/exceptions/app-exception';
import { ICreateMachineRepository } from '@/business/interfaces/repository/machine/create.interface';
import { IGetMachineByNameRepository } from '@/business/interfaces/repository/machine/get-by-name.interface';

import { ICreateMachine } from '@/business/interfaces/use-cases/machine/create.interface';
import { IVerifySensor } from '@/business/interfaces/use-cases/machine/verify-sensor.interface';
import { IMachine } from '@/business/model/machine.interface';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

export default class CreateMachine implements ICreateMachine<IMachine> {
  constructor(
    @Inject(TOKENS.CreateMachineRepository)
    private readonly createMachineRepository: ICreateMachineRepository,
    @Inject(TOKENS.VerifySensorService)
    private readonly verifySensorService: IVerifySensor,
    @Inject(TOKENS.GetMachineByNameRepository)
    private readonly GetMachineByName: IGetMachineByNameRepository,
    private readonly i18n: I18nService,
  ) {}

  async execute(
    data: IMachine,
  ): Promise<CustomResponseViewModel<string | null>> {
    const machineSensor1 = await this.verifySensorService.execute(
      data.sensorIdentifier,
    );
    const machineSensor2 = await this.verifySensorService.execute(
      data.sensorIdentifier2,
    );
    const machine = await this.GetMachineByName.execute(data.name);

    if (machineSensor1 || machineSensor2 || machine) {
      let errors: ICustomError[] = [];
      if (machineSensor1) errors.push({ key: 'machine.error.sensorAttached' });
      if (machineSensor2) errors.push({ key: 'machine.error.sensorAttached2' });
      if (machine) errors.push({ key: 'machine.error.nameAlreadyInUse' });

      throw new AppException(errors, HttpStatus.BAD_REQUEST);
    }

    if (!data.status) data.status = MachineStatusEnum.inactive;

    const response = await this.createMachineRepository.execute(data);
    return customResponse<string>(response);
  }
}
