import { TOKENS } from '@/business/di/tokens';
import { MachineVelocityCreate } from '@/business/dtos/machine-velocity/create';
import { ICreateMachineVelocityRepository } from '@/business/interfaces/repository/machine-velocity/create.interface';
import * as schema from '@/database/drizzle/schema';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class CreateMachineVelocityRepository
  implements ICreateMachineVelocityRepository
{
  constructor(
    @Inject(TOKENS.DrizzleAsyncProvider)
    public db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(data: MachineVelocityCreate): Promise<boolean> {
    const recordsAdded = await this.db
      .insert(schema.machineVelocity)
      .values({ ...data })
      .returning();
    if (recordsAdded.length < 1) return false;

    return true;
  }
}
