import { TOKENS } from '@/business/di/tokens';
import { CreateMachineVelocityRepository } from '@/database/repositories/machine-velocity/create';
import { GetMachineVelocityByMachineIdRepository } from '@/database/repositories/machine-velocity/get-by-machine-id';
import { GetLastMachineVelocityByMachineIdRepository } from '@/database/repositories/machine-velocity/get-last-by-machine-id';
import { GetMachineVelocityPagedRepository } from '@/database/repositories/machine-velocity/get-paged';
import { Provider } from '@nestjs/common';

export const machineVelocityProviders: Provider[] = [
  {
    provide: TOKENS.CreateMachineVelocityRepository,
    useClass: CreateMachineVelocityRepository,
  },
  {
    provide: TOKENS.GetLastMachineVelocityByMachineIdRepository,
    useClass: GetLastMachineVelocityByMachineIdRepository,
  },
  {
    provide: TOKENS.GetMachineVelocityByMachineIdRepository,
    useClass: GetMachineVelocityByMachineIdRepository,
  },
  {
    provide: TOKENS.GetMachineVelocityPagedRepository,
    useClass: GetMachineVelocityPagedRepository,
  },
];
