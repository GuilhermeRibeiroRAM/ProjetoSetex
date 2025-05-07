import { IProductionOrder } from '@/business/model/production-order.interface';

export interface IUpdateProductionOrderRepository {
  execute(machineId: string, data: Partial<IProductionOrder>): Promise<boolean>;
}
