import { IMachineVelocity } from '@/business/model/machine-velocity.interface';

export interface IGetLastMachineVelocityByMachineIdRepository {
  execute(machineId: string): Promise<IMachineVelocity | null>;
}
