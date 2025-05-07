import { CreateSensorStatusDataModel } from '@/api/data-models/sensor-status/create.dm';
import { TOKENS } from '@/business/di/tokens';
import { SensorStatusEnum } from '@/business/enums/sensor-status.enum';
import { IGetAllMachineRepository } from '@/business/interfaces/repository/machine/get-all.interface';
import { IMachine } from '@/business/model/machine.interface';
import { Inject } from '@nestjs/common';

type Config = {
  intervalReadings: number;
  status: 'random' | 'working' | 'crashed';
  velocityMax: number;
  velocityMin: number;
};

const ConfigureGeneration: Config = {
  intervalReadings: 10000,
  status: 'random',
  velocityMax: 10.0,
  velocityMin: 1.0,
};

const URL = `http://${process.env.URL}:${process.env.PORT}/sensor-status/create/`;

export class GenerateSensorReadings {
  constructor(
    @Inject(TOKENS.GetAllMachineRepository)
    private readonly getAllMachineRepsitory: IGetAllMachineRepository,
  ) {
    if (process.env.GENERATE_FALSE_SENSOR_READING === '1') this.run();
  }

  async generate(): Promise<CreateSensorStatusDataModel[]> {
    const machines: IMachine[] = await this.getAllMachineRepsitory.execute();
    const status = [SensorStatusEnum.active, SensorStatusEnum.inactive];

    const data: CreateSensorStatusDataModel[] = machines.map((machine) => {
      const velocity =
        Math.random() *
        (ConfigureGeneration.velocityMax - ConfigureGeneration.velocityMin + 1);
      const random = Math.floor(Math.random() * status.length);
      return {
        sensorIdentifier: machine.sensorIdentifier,
        velocity,
        status:
          ConfigureGeneration.status === 'random'
            ? status[random]
            : SensorStatusEnum[ConfigureGeneration.status],
      };
    });
    return data;
  }

  async send(data: CreateSensorStatusDataModel): Promise<void> {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async run(): Promise<void> {
    setInterval(async () => {
      const data = await this.generate();
      data.forEach((reading) => this.send(reading));
    }, ConfigureGeneration.intervalReadings);
  }
}
