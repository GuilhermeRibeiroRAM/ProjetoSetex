import { SensorStatusEnum } from '@/business/enums/sensor-status.enum';

export class SensorStatusViewModel {
  id: number;
  machineId: string;
  sensorIdentifier: string;
  status: SensorStatusEnum;
  lastSensorCheck: Date;
  createdAt: Date;
  updatedAt: Date;
}
