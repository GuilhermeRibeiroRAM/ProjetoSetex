import { ISensorStatus } from '@/business/model/sensor-status.interface';

export interface ICreateSensorStatus {
  execute(data: ISensorStatus): Promise<boolean>;
}
