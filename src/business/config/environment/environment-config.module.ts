import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment.validation';
import { providers } from '@/business/config/environment/module-providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      validate,
    }),
  ],
  providers: providers,
  exports: providers,
})
export class EnvironmentConfigModule {}
