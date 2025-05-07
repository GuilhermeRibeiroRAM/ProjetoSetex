import { SensorStatusEnum } from '@/business/enums/sensor-status.enum';

export class CreateSensorStatusDataModel {
  sensorIdentifier: string;
  status: SensorStatusEnum;
  velocity: number;
}
