import { ISensorStatus } from '@/business/model/sensor-status.interface';

export interface IUpdateSensorStatus {
  execute(id: number, data: Partial<ISensorStatus>): Promise<boolean>;
}
