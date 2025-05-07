import { ISensorStatus } from '@/business/model/sensor-status.interface';

export interface ISensorStatusRepository {
  execute(id: number, data: Partial<ISensorStatus>): Promise<boolean>;
}
