import { TOKENS } from '@/business/di/tokens';
import { IDeleteMachineRepository } from '@/business/interfaces/repository/machine/delete.interface';
import { IDelete } from '@/business/interfaces/use-cases/base/delete.interface';
import { Inject } from '@nestjs/common';

export default class DeleteMachine implements IDelete {
  constructor(
    @Inject(TOKENS.DeleteMachineRepository)
    private readonly deleteMachineRepository: IDeleteMachineRepository,
  ) {}
  async execute(id: string): Promise<boolean> {
    const response = await this.deleteMachineRepository.execute(id);
    return response;
  }
}
