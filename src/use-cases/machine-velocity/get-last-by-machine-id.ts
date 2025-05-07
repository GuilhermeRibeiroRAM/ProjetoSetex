import { TOKENS } from '@/business/di/tokens';
import { IGetLastMachineVelocityByMachineIdRepository } from '@/business/interfaces/repository/machine-velocity/get-last-by-machine-id.interface';
import { IGetLastMachineVelocityByMachineId } from '@/business/interfaces/use-cases/machine-velocity/get-last-by-machine-id.interface';
import { IMachineVelocity } from '@/business/model/machine-velocity.interface';
import { Inject } from '@nestjs/common';

export default class GetLastMachineVelocityByMachineId
  implements IGetLastMachineVelocityByMachineId
{
  constructor(
    @Inject(TOKENS.GetLastMachineVelocityByMachineIdRepository)
    private readonly getLastMachineVelocityByMachineIdRepository: IGetLastMachineVelocityByMachineIdRepository,
  ) {}
  async execute(id: string): Promise<IMachineVelocity> {
    const response =
      await this.getLastMachineVelocityByMachineIdRepository.execute(id);
    return response;
  }
}
