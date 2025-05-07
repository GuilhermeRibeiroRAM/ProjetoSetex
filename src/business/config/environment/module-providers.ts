import { EnvironmentConfigService } from '@/business/config/environment/environment-config.service';
import { TOKENS } from '@/business/di/tokens';
import { simpleInjection } from '@/business/di/utils/simpleInjection';
import { Provider } from '@nestjs/common';

export const providers: Provider[] = [
  simpleInjection(TOKENS.EnvironmentConfigService, EnvironmentConfigService),
];
