import { TOKENS } from '@/business/di/tokens';
import CreateMachineVelocity from '@/use-cases/machine-velocity/create';
import GetMachineVelocityByMachineId from '@/use-cases/machine-velocity/get-by-machine-id';
import GetLastMachineVelocityByMachineId from '@/use-cases/machine-velocity/get-last-by-machine-id';
import GetPagedMachineVelocity from '@/use-cases/machine-velocity/get-paged';
import { Provider } from '@nestjs/common';

export const machineVelocityProviders: Provider[] = [
  {
    provide: TOKENS.CreateMachineVelocityService,
    useClass: CreateMachineVelocity,
  },
  {
    provide: TOKENS.GetLastMachineVelocityByMachineIdService,
    useClass: GetLastMachineVelocityByMachineId,
  },
  {
    provide: TOKENS.GetMachineVelocityByMachineIdService,
    useClass: GetMachineVelocityByMachineId,
  },
  {
    provide: TOKENS.GetMachineVelocityPagedService,
    useClass: GetPagedMachineVelocity,
  },
];
