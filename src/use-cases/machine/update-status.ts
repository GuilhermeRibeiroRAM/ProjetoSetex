import { TOKENS } from '@/business/di/tokens';
import { MachineStatusEnum } from '@/business/enums/machine-status.enum';
import { IGetMachineByIdRepository } from '@/business/interfaces/repository/machine/get-by-id.interface';
import { IUpdateMachineRepository } from '@/business/interfaces/repository/machine/update.interface';
import { IUpdateStatusMachine } from '@/business/interfaces/use-cases/machine/update-status.interface';
import { Inject } from '@nestjs/common';

export default class UpdateStatusMachine implements IUpdateStatusMachine {
  constructor(
    @Inject(TOKENS.GetMachineByIdRepository)
    private readonly getMachineByIdRepository: IGetMachineByIdRepository,
    @Inject(TOKENS.UpdateMachineRepository)
    private readonly updateMachineRepository: IUpdateMachineRepository,
  ) {}
  async execute(id: string, status: MachineStatusEnum): Promise<boolean> {
    const machine = await this.getMachineByIdRepository.execute(id);

    if (!machine) return false;

    const response = await this.updateMachineRepository.execute(id, {
      ...machine,
      id: undefined,
      status,
    });
    return response;
  }
}
