import { ISensorStatus } from '@/business/model/sensor-status.interface';

export interface IGetSensorStatusByIdRepository {
  execute(id: string): Promise<ISensorStatus | null>;
}
