import { TOKENS } from '@/business/di/tokens';
import { IUpdateRepository } from '@/business/interfaces/repository/base/update.interface';
import { productionOrder } from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { Table, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/drizzle/schema';
import { IProductionOrder } from '@/business/model/production-order.interface';
import { IUpdateProductionOrderRepository } from '@/business/interfaces/repository/production-order/update.interface';

export class UpdateProductionOrderRepository
  implements IUpdateProductionOrderRepository
{
  private updateRepository: IUpdateRepository<Partial<IProductionOrder>>;

  constructor(
    @Inject(TOKENS.UpdateRepository)
    private factoryUpdateRepository: (
      table: Table,
    ) => IUpdateRepository<Partial<IProductionOrder>>,
    @Inject(TOKENS.DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {
    this.updateRepository = this.factoryUpdateRepository(productionOrder);
  }

  async execute(machineId: string, data: { name: string }): Promise<boolean> {
    const existingOrder = await this.db
      .select()
      .from(schema.productionOrder)
      .where(eq(schema.productionOrder.machineId, machineId));

    if (existingOrder.length >= 1) {
      return await this.updateRepository.execute(existingOrder[0].id, data);
    } else {
      const result = await this.db.insert(schema.productionOrder).values({
        machineId,
        name: data.name,
      });

      return result.rowCount > 0;
    }
  }
}
