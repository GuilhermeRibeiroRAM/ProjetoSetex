import { TOKENS } from '@/business/di/tokens';
import { MachineVelocityCreate } from '@/business/dtos/machine-velocity/create';
import { ICreateMachineVelocityRepository } from '@/business/interfaces/repository/machine-velocity/create.interface';
import { ICreateMachineVelocity } from '@/business/interfaces/use-cases/machine-velocity/create.interface';
import { Inject } from '@nestjs/common';

export default class CreateMachineVelocity implements ICreateMachineVelocity {
  constructor(
    @Inject(TOKENS.CreateMachineVelocityRepository)
    private readonly createMachineVelocityRepository: ICreateMachineVelocityRepository,
  ) {}
  async execute(data: MachineVelocityCreate): Promise<boolean> {
    const response = await this.createMachineVelocityRepository.execute(data);
    return response;
  }
}
