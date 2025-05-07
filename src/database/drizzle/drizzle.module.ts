import { TOKENS } from '@/business/di/tokens';
import { drizzleProvider } from '@/database/drizzle/drizzle.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [...drizzleProvider],
  exports: [TOKENS.DrizzleAsyncProvider],
})
export class DrizzleModule {}
