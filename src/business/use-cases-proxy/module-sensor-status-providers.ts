import { TOKENS } from '@/business/di/tokens';
import CreateSensorStatus from '@/use-cases/sensor-status/create';
import DeleteSensorStatus from '@/use-cases/sensor-status/delete';
import GetSensorStatusByIdRepositoryById from '@/use-cases/sensor-status/get-by-id';
import GetSensorStatusByMachineId from '@/use-cases/sensor-status/get-by-machine-id';
import GetLastByMachineId from '@/use-cases/sensor-status/get-last-by-machine-id';
import GetPagedSensorStatus from '@/use-cases/sensor-status/get-paged';

import UpdateSensorStatus from '@/use-cases/sensor-status/update';

import { Provider } from '@nestjs/common';

export const sensorStatusProviders: Provider[] = [
  {
    provide: TOKENS.DeleteSensorStatusService,
    useClass: DeleteSensorStatus,
  },
  {
    provide: TOKENS.GetSensorStatusByIdService,
    useClass: GetSensorStatusByIdRepositoryById,
  },
  {
    provide: TOKENS.GetLastSensorStatusByMachineIdService,
    useClass: GetLastByMachineId,
  },
  {
    provide: TOKENS.GetSensorStatusByIdService,
    useClass: GetSensorStatusByMachineId,
  },
  {
    provide: TOKENS.GetSensorStatusPagedService,
    useClass: GetPagedSensorStatus,
  },
  {
    provide: TOKENS.CreateSensorStatusService,
    useClass: CreateSensorStatus,
  },
  {
    provide: TOKENS.UpdateSensorStatusService,
    useClass: UpdateSensorStatus,
  },
];
