import { customResponse } from '@/api/utils/custom-response';
import { CustomResponseViewModel } from '@/api/view-models/common/custom-response';
import { TOKENS } from '@/business/di/tokens';
import { IUpdateProductionOrderRepository } from '@/business/interfaces/repository/production-order/update.interface';
import { IUpdateProdctionOrder } from '@/business/interfaces/use-cases/production-order/update.interface';
import { IProductionOrder } from '@/business/model/production-order.interface';
import { Inject } from '@nestjs/common';

export default class UpdateProductionOrder implements IUpdateProdctionOrder {
  constructor(
    @Inject(TOKENS.UpdateProductionOrderRepository)
    private readonly updateProductionOrderRepository: IUpdateProductionOrderRepository,
  ) {}
  async execute(
    machineId: string,
    data: Partial<IProductionOrder>,
  ): Promise<CustomResponseViewModel<boolean>> {
    const response = await this.updateProductionOrderRepository.execute(
      machineId,
      data,
    );
    return customResponse(response);
  }
}
