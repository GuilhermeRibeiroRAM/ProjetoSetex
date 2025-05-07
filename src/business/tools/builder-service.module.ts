import { TOKENS } from '@/business/di/tokens';
import { simpleInjection } from '@/business/di/utils/simpleInjection';
import BuilderService from '@/business/tools/BuilderService';
import { Module, Scope } from '@nestjs/common';

@Module({
  imports: [],
  providers: [
    simpleInjection(TOKENS.BuilderService, BuilderService, Scope.TRANSIENT),
  ],
  exports: [TOKENS.BuilderService],
})
export class BuilderServiceModule {}
