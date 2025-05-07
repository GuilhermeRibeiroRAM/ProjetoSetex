import { TOKENS } from '@/business/di/tokens';
import { AppException } from '@/business/exceptions/app-exception';
import { ICreateSensorStatusRepository } from '@/business/interfaces/repository/sensor-status/create.interface';
import { IGetLastSensorStatusByMachineIdRepository } from '@/business/interfaces/repository/sensor-status/get-last-by-machine-id.interface';
import { ISensorStatusRepository } from '@/business/interfaces/repository/sensor-status/update.interface';
import { ICreateSensorStatus } from '@/business/interfaces/use-cases/sensor-status/create.interface';
import { ICreateMachineVelocity } from '@/business/interfaces/use-cases/machine-velocity/create.interface';
import { IGetMachineBySensorIdentifier } from '@/business/interfaces/use-cases/machine/get-by-sensor-code.interface';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import { HttpStatus, Inject } from '@nestjs/common';

export default class CreateSensorStatus implements ICreateSensorStatus {
  constructor(
    @Inject(TOKENS.CreateSensorStatusRepository)
    private readonly createSensorStatusRepository: ICreateSensorStatusRepository,
    @Inject(TOKENS.UpdateSensorStatusRepository)
    private readonly updateSensorStatusRepository: ISensorStatusRepository,
    @Inject(TOKENS.GetMachineBySensorIdentifierService)
    private readonly getMachineBySensorIdentifierService: IGetMachineBySensorIdentifier,
    @Inject(TOKENS.GetLastSensorStatusByMachineIdRepository)
    private readonly getLastSensorStatusByMachineId: IGetLastSensorStatusByMachineIdRepository,
    @Inject(TOKENS.CreateMachineVelocityService)
    private readonly createMachineVelocityService: ICreateMachineVelocity,
  ) {}
  async execute(data: ISensorStatus, velocity?: number): Promise<boolean> {
    const machine = await this.getMachineBySensorIdentifierService.execute(
      data.sensorIdentifier,
    );

    if (!machine)
      throw new AppException(
        [
          {
            key: 'machine.machinePark.listEmptyMessage',
            value: 'Machine not found.',
          },
        ],
        HttpStatus.NOT_FOUND,
      );

    data.machineId = machine.id;

    const sensorStatus = await this.getLastSensorStatusByMachineId.execute(
      machine.id,
    );

    data.lastSensorCheck = new Date();
    data.lastSensorCheck.setMilliseconds(0);
    data.updatedAt = data.lastSensorCheck;

    if (velocity !== undefined) {
      await this.createMachineVelocityService.execute({
        machineId: machine.id,
        sensorIdentifier: data.sensorIdentifier,
        velocity,
      });
    }

    if (sensorStatus && sensorStatus.status === data.status) {
      return await this.updateSensorStatusRepository.execute(
        sensorStatus.id,
        data,
      );
    }

    const response = await this.createSensorStatusRepository.execute(data);
    return response;
  }
}
