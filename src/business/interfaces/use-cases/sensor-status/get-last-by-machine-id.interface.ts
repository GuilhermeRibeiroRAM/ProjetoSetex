import { ISensorStatus } from '@/business/model/sensor-status.interface';

export interface IGetLastSensorStatusByMachineId {
  execute(machineId: string): Promise<ISensorStatus | null>;
}
