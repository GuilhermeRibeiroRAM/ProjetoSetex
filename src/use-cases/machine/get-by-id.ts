import { TOKENS } from '@/business/di/tokens';
import { IGetMachineByIdRepository } from '@/business/interfaces/repository/machine/get-by-id.interface';
import { IGetById } from '@/business/interfaces/use-cases/base/get-by-id.interface';
import { IMachine } from '@/business/model/machine.interface';
import { Inject } from '@nestjs/common';

export default class GetMachineById implements IGetById<IMachine> {
  constructor(
    @Inject(TOKENS.GetMachineByIdRepository)
    private readonly getMachineByIdRepository: IGetMachineByIdRepository,
  ) {}
  async execute(id: string): Promise<IMachine> {
    const response = await this.getMachineByIdRepository.execute(id);
    return response;
  }
}
