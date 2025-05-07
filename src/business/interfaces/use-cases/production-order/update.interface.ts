import { CustomResponseViewModel } from '@/api/view-models/common/custom-response';
import { IProductionOrder } from '@/business/model/production-order.interface';

export interface IUpdateProdctionOrder {
  execute(
    machineId: string,
    data: Partial<IProductionOrder>,
  ): Promise<CustomResponseViewModel<boolean>>;
}
