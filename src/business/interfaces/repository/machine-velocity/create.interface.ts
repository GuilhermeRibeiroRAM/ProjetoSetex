import { MachineVelocityCreate } from '@/business/dtos/machine-velocity/create';

export interface ICreateMachineVelocityRepository {
  execute(data: MachineVelocityCreate): Promise<boolean>;
}
