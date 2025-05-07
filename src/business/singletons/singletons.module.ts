import { TOKENS } from '@/business/di/tokens';
import { simpleInjection } from '@/business/di/utils/simpleInjection';
import { GenerateSensorReadings } from '@/business/singletons/generate-sensor-readings';
import { UseCasesProxyModule } from '@/business/use-cases-proxy/use-cases-proxy.module';
import { RepositoriesModule } from '@/database/module/repositories.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UseCasesProxyModule, RepositoriesModule],
  providers: [
    simpleInjection(TOKENS.GenerateSensorReadings, GenerateSensorReadings),
  ],
  exports: [
    simpleInjection(TOKENS.GenerateSensorReadings, GenerateSensorReadings),
  ],
})
export class SingletonsModule {}
