import { AuthController } from '@/api/controllers/auth/auth.controller';
import { UserController } from '@/api/controllers/user/user.controller';
import { AllExceptionsFilter } from '@/business/common/filters/all';
import { JwtAuthGuard } from '@/business/common/guards/auth';
import { EnvironmentConfigModule } from '@/business/config/environment/environment-config.module';
import { ExceptionsModule } from '@/business/exceptions/exceptions.module';
import { SingletonsModule } from '@/business/singletons/singletons.module';
import { UseCasesProxyModule } from '@/business/use-cases-proxy/use-cases-proxy.module';
import { RepositoriesModule } from '@/database/module/repositories.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleModule } from './database/drizzle/drizzle.module';
import { SensorStatusController } from '@/api/controllers/sensor-status/sensor-status.controller';
import { MachineController } from '@/api/controllers/machine/machine.controller';
import { ProductionOrderController } from './api/controllers/production-order/production-order';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    EnvironmentConfigModule,
    ExceptionsModule,
    RepositoriesModule,
    UseCasesProxyModule.register(),
    DrizzleModule,
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SingletonsModule,
    JwtModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../i18n/'),
        watch: true,
      },
      typesOutputPath: path.join(
        __dirname,
        '..',
        '..',
        'src/i18n/generated.ts',
      ),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],

  controllers: [
    UserController,
    AuthController,
    MachineController,
    SensorStatusController,
    ProductionOrderController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
