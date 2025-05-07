import { TOKENS } from '@/business/di/tokens';
import { CreateSensorStatusRepository } from '@/database/repositories/sensor-status/create';
import { DeleteSensorStatusRepository } from '@/database/repositories/sensor-status/delete';
import { GetSensorStatusByIdRepository } from '@/database/repositories/sensor-status/get-by-id';
import { GetSensorStatusByMachineIdRepository } from '@/database/repositories/sensor-status/get-by-machine-id';
import { GetLastSensorStatusByMachineIdRepository } from '@/database/repositories/sensor-status/get-last-by-machine-id';
import { GetISensorStatusPagedRepository } from '@/database/repositories/sensor-status/get-paged';
import { UpdateSensorStatusRepository } from '@/database/repositories/sensor-status/update';
import { Provider } from '@nestjs/common';

export const sensorStatusProviders: Provider[] = [
  {
    provide: TOKENS.CreateSensorStatusRepository,
    useClass: CreateSensorStatusRepository,
  },
  {
    provide: TOKENS.UpdateSensorStatusRepository,
    useClass: UpdateSensorStatusRepository,
  },
  {
    provide: TOKENS.GetSensorStatusByIdRepository,
    useClass: GetSensorStatusByIdRepository,
  },
  {
    provide: TOKENS.GetLastSensorStatusByMachineIdRepository,
    useClass: GetLastSensorStatusByMachineIdRepository,
  },
  {
    provide: TOKENS.GetSensorStatusByMachineIdRepository,
    useClass: GetSensorStatusByMachineIdRepository,
  },
  {
    provide: TOKENS.GetSensorStatusPagedRepository,
    useClass: GetISensorStatusPagedRepository,
  },
  {
    provide: TOKENS.DeleteSensorStatusRepository,
    useClass: DeleteSensorStatusRepository,
  },
];
