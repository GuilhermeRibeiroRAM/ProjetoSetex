import { UpdateProductionOrderDataModel } from '@/api/data-models/production-order/update-production-order';
import { customResponse } from '@/api/utils/custom-response';
import { CustomResponseViewModel } from '@/api/view-models/common/custom-response';
import { Public } from '@/business/common/decorators/public';
import { TOKENS } from '@/business/di/tokens';
import UpdateProductionOrder from '@/use-cases/production-order/update';
import { Body, Controller, Inject, Param, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Production-Order')
@Controller('production-order')
export class ProductionOrderController {
  constructor(
    @Inject(TOKENS.UpdateProductionOrderService)
    private readonly updateProductionOrderService: UpdateProductionOrder,
  ) {}

  @Public()
  @Put('/update/:machineId')
  @ApiBody({
    type: UpdateProductionOrderDataModel,
  })
  async update(
    @Param('machineId') machineId: string,
    @Body() data: UpdateProductionOrderDataModel,
  ): Promise<any> {
    const response = await this.updateProductionOrderService.execute(
      machineId,
      data,
    );
    return response;
  }
}
