import { TOKENS } from '@/business/di/tokens';
import { IDeleteRepository } from '@/business/interfaces/repository/base/delete.interface';
import { IDeleteMachineRepository } from '@/business/interfaces/repository/machine/delete.interface';
import { machines } from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';

export class DeleteMachineRepository implements IDeleteMachineRepository {
  private deleteRepository: IDeleteRepository;
  constructor(
    @Inject(TOKENS.DeleteRepository)
    private factoryDeleteRepository: (table: Table) => IDeleteRepository,
  ) {
    this.deleteRepository = this.factoryDeleteRepository(machines);
  }

  async execute(id: string): Promise<boolean> {
    const response = await this.deleteRepository.execute(id);

    return response;
  }
}
