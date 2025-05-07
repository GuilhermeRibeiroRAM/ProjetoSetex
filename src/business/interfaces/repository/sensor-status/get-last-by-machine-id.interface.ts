import { ISensorStatus } from '@/business/model/sensor-status.interface';

export interface IGetLastSensorStatusByMachineIdRepository {
  execute(machineId: string): Promise<ISensorStatus | null>;
}
