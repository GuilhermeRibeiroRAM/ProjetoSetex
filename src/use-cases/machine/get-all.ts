import { TOKENS } from '@/business/di/tokens';
import { IGetAllMachineRepository } from '@/business/interfaces/repository/machine/get-all.interface';
import { IGetAllMachine } from '@/business/interfaces/use-cases/machine/get-all.interface';
import { IMachine } from '@/business/model/machine.interface';
import { Inject } from '@nestjs/common';

export default class GetAllMachine implements IGetAllMachine {
  constructor(
    @Inject(TOKENS.GetAllMachineRepository)
    private readonly getAllMachineRepository: IGetAllMachineRepository,
  ) {}
  async execute(): Promise<IMachine[]> {
    const response = await this.getAllMachineRepository.execute();
    return response;
  }
}
