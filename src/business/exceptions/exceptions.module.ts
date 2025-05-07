import { TOKENS } from '@/business/di/tokens';
import { simpleInjection } from '@/business/di/utils/simpleInjection';
import { ExceptionsService } from '@/business/exceptions/exceptions.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [simpleInjection(TOKENS.ExceptionsService, ExceptionsService)],
  exports: [simpleInjection(TOKENS.ExceptionsService, ExceptionsService)],
})
export class ExceptionsModule {}
