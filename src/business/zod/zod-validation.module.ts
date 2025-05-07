import { TOKENS } from '@/business/di/tokens';
import { simpleInjection } from '@/business/di/utils/simpleInjection';
import { ZodValidationService } from '@/business/zod/zod-validation.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [
    simpleInjection(TOKENS.ZodValidationService, ZodValidationService),
  ],
  exports: [simpleInjection(TOKENS.ZodValidationService, ZodValidationService)],
})
export class ZodValidationModule {}
