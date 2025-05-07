import { TOKENS } from '@/business/di/tokens';
import { IGetMachineByNameRepository } from '@/business/interfaces/repository/machine/get-by-name.interface';

import { IGetMachineByName } from '@/business/interfaces/use-cases/machine/get-by-name';

import { IMachine } from '@/business/model/machine.interface';
import { Inject } from '@nestjs/common';

export default class GetMachineByName implements IGetMachineByName {
  constructor(
    @Inject(TOKENS.GetMachineByNameRepository)
    private readonly getMachineByName: IGetMachineByNameRepository,
  ) {}
  async execute(sensor: string): Promise<IMachine> {
    const response = await this.getMachineByName.execute(sensor);

    return response;
  }
}
