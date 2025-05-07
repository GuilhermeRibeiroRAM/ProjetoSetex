import { IMachineVelocity } from '@/business/model/machine-velocity.interface';

export interface IGetLastMachineVelocityByMachineId {
  execute(machineId: string): Promise<IMachineVelocity | null>;
}
