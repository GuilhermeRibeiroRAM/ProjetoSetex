import { ISensorStatus } from '@/business/model/sensor-status.interface';

export interface ICreateSensorStatusRepository {
  execute(data: ISensorStatus): Promise<boolean>;
}
