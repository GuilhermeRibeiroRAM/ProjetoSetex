import { TOKENS } from '@/business/di/tokens';
import { Provider } from '@nestjs/common';
import { UpdateProductionOrderRepository } from '../repositories/production-order/update';

export const productionOrderProviders: Provider[] = [
  {
    provide: TOKENS.UpdateProductionOrderRepository,
    useClass: UpdateProductionOrderRepository,
  },
];
