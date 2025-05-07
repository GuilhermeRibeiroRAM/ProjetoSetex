import { TOKENS } from '@/business/di/tokens';
import UpdateProductionOrder from '@/use-cases/production-order/update';
import { Provider } from '@nestjs/common';

export const productionOrderProviders: Provider[] = [
  {
    provide: TOKENS.UpdateProductionOrderService,
    useClass: UpdateProductionOrder,
  },
];
