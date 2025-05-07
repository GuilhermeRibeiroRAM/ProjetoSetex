import { DrizzleModule } from '@/database/drizzle/drizzle.module';
import { baseProviders } from '@/database/module/base-providers';
import { sensorStatusProviders } from '@/database/module/sensor-status-providers';
import { machineProviders } from '@/database/module/machine-providers';
import { machineVelocityProviders } from '@/database/module/machine-velocity-providers';
import { userProviders } from '@/database/module/user-providers';
import { Module } from '@nestjs/common';
import { productionOrderProviders } from './production-order-providers';

@Module({
  imports: [DrizzleModule],
  providers: [
    ...baseProviders,
    ...userProviders,
    ...machineProviders,
    ...sensorStatusProviders,
    ...machineVelocityProviders,
    ...productionOrderProviders,
  ],
  exports: [
    ...baseProviders,
    ...userProviders,
    ...machineProviders,
    ...sensorStatusProviders,
    ...machineVelocityProviders,
    ...productionOrderProviders,
  ],
})
export class RepositoriesModule {}
