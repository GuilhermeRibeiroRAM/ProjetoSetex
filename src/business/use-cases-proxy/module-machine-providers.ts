import { TOKENS } from '@/business/di/tokens';
import CreateMachine from '@/use-cases/machine/create';
import DeleteMachine from '@/use-cases/machine/delete';
import GetAllMachine from '@/use-cases/machine/get-all';
import GetMachineById from '@/use-cases/machine/get-by-id';
import GetMachineBySensorIdentifier from '@/use-cases/machine/get-by-sensor';
import GetPagedMachine from '@/use-cases/machine/get-paged';
import UpdateMachine from '@/use-cases/machine/update';
import UpdateStatusMachine from '@/use-cases/machine/update-status';
import VerifySensor from '@/use-cases/machine/verify-sensor';
import { Provider } from '@nestjs/common';

export const machineProviders: Provider[] = [
  {
    provide: TOKENS.CreateMachineService,
    useClass: CreateMachine,
  },
  {
    provide: TOKENS.UpdateMachineService,
    useClass: UpdateMachine,
  },
  {
    provide: TOKENS.UpdateStatusMachineService,
    useClass: UpdateStatusMachine,
  },
  {
    provide: TOKENS.DeleteMachineService,
    useClass: DeleteMachine,
  },
  {
    provide: TOKENS.GetMachineByIdService,
    useClass: GetMachineById,
  },
  {
    provide: TOKENS.GetMachineBySensorIdentifierService,
    useClass: GetMachineBySensorIdentifier,
  },
  {
    provide: TOKENS.GetMachinePagedService,
    useClass: GetPagedMachine,
  },
  {
    provide: TOKENS.GetAllMachineService,
    useClass: GetAllMachine,
  },
  {
    provide: TOKENS.VerifySensorService,
    useClass: VerifySensor,
  },
];
