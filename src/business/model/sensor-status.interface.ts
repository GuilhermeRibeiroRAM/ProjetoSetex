import { SensorStatusEnum } from '@/business/enums/sensor-status.enum';

export interface ISensorStatus {
  id: number;
  machineId: string;
  sensorIdentifier: string;
  status: SensorStatusEnum;
  lastSensorCheck: Date;
  createdAt: Date;
  updatedAt: Date;
}
