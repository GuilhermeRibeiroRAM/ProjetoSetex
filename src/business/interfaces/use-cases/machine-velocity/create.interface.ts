import { MachineVelocityCreate } from '@/business/dtos/machine-velocity/create';

export interface ICreateMachineVelocity {
  execute(data: MachineVelocityCreate): Promise<boolean>;
}
