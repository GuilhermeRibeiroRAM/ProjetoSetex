import { EnvironmentConfigModule } from '@/business/config/environment/environment-config.module';
import { ExceptionsModule } from '@/business/exceptions/exceptions.module';
import { JwtRefreshStrategy } from '@/business/passport/strategies/jwt-refresh.strategy';
import { JwtStrategy } from '@/business/passport/strategies/jwt.strategy';
import { LocalStrategy } from '@/business/passport/strategies/local.strategy';
import { authProviders } from '@/business/use-cases-proxy/module-auth-providers';
import { sensorStatusProviders } from '@/business/use-cases-proxy/module-sensor-status-providers';
import { machineProviders } from '@/business/use-cases-proxy/module-machine-providers';
import { machineVelocityProviders } from '@/business/use-cases-proxy/module-machine-velocity-providers';
import { userProviders } from '@/business/use-cases-proxy/module-user-providers';
import { ZodValidationModule } from '@/business/zod/zod-validation.module';
import { RepositoriesModule } from '@/database/module/repositories.module';
import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { productionOrderProviders } from './module-production-order-providers';

@Module({
  imports: [
    EnvironmentConfigModule,
    ExceptionsModule,
    ZodValidationModule,
    RepositoriesModule,
    PassportModule,
    JwtModule,
  ],
})
export class UseCasesProxyModule {
  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        LocalStrategy,
        JwtStrategy,
        JwtRefreshStrategy,
        ...authProviders,
        ...userProviders,
        ...machineProviders,
        ...sensorStatusProviders,
        ...machineVelocityProviders,
        ...productionOrderProviders,
      ],
      exports: [
        ...authProviders,
        ...userProviders,
        ...machineProviders,
        ...sensorStatusProviders,
        ...machineVelocityProviders,
        ...productionOrderProviders,
      ],
    };
  }
}
