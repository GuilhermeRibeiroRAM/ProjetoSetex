import { TOKENS } from '@/business/di/tokens';
import { IGetByIdRepository } from '@/business/interfaces/repository/base/get-by-id.interface';
import { IGetMachineByIdRepository } from '@/business/interfaces/repository/machine/get-by-id.interface';
import { IMachine } from '@/business/model/machine.interface';
import { machines } from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';

export class GetMachineByIdRepository implements IGetMachineByIdRepository {
  private getByIdRepository: IGetByIdRepository<IMachine>;
  constructor(
    @Inject(TOKENS.GetByIdRepository)
    private factoryGetByIdRepository: (
      table: Table,
    ) => IGetByIdRepository<IMachine>,
  ) {
    this.getByIdRepository = this.factoryGetByIdRepository(machines);
  }

  async execute(id: string): Promise<IMachine | null> {
    const machine = await this.getByIdRepository.execute(id);

    return machine;
  }
}
