import { TOKENS } from '@/business/di/tokens';
import { CreateMachineRepository } from '@/database/repositories/machine/create';
import { DeleteMachineRepository } from '@/database/repositories/machine/delete';
import { GetAllMachineRepository } from '@/database/repositories/machine/get-all';
import { GetMachineByIdRepository } from '@/database/repositories/machine/get-by-id';
import { GetMachineBySensorCodeRepository } from '@/database/repositories/machine/get-by-sensor-code';
import { GetMachinePagedRepository } from '@/database/repositories/machine/get-paged';
import { UpdateMachineRepository } from '@/database/repositories/machine/update';
import { Provider } from '@nestjs/common';
import { GetMachineByNameRepository } from '../repositories/machine/get-by-name';

export const machineProviders: Provider[] = [
  {
    provide: TOKENS.CreateMachineRepository,
    useClass: CreateMachineRepository,
  },
  {
    provide: TOKENS.UpdateMachineRepository,
    useClass: UpdateMachineRepository,
  },
  {
    provide: TOKENS.GetMachineByIdRepository,
    useClass: GetMachineByIdRepository,
  },
  {
    provide: TOKENS.GetMachineBySensorIdentifierRepository,
    useClass: GetMachineBySensorCodeRepository,
  },
  {
    provide: TOKENS.GetMachinePagedRepository,
    useClass: GetMachinePagedRepository,
  },
  {
    provide: TOKENS.GetAllMachineRepository,
    useClass: GetAllMachineRepository,
  },
  {
    provide: TOKENS.DeleteMachineRepository,
    useClass: DeleteMachineRepository,
  },
  {
    provide: TOKENS.GetMachineByNameRepository,
    useClass: GetMachineByNameRepository,
  },
];
