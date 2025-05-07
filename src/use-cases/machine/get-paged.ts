import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { IQueryOptions } from '@/business/dtos/common/query-options';
import { IGetMachinePagedRepository } from '@/business/interfaces/repository/machine/get-paged.interface';
import { IGetPaged } from '@/business/interfaces/use-cases/base/get-paged.interface';
import { IMachine } from '@/business/model/machine.interface';
import { Inject } from '@nestjs/common';

export default class GetPagedMachine implements IGetPaged<IMachine> {
  constructor(
    @Inject(TOKENS.GetMachinePagedRepository)
    private readonly getMachinePagedRepository: IGetMachinePagedRepository,
  ) {}
  async execute(options: IQueryOptions): Promise<IPagedResult<IMachine>> {
    const response = await this.getMachinePagedRepository.execute({
      ...options,
      columnsComparison: ['name'],
    });
    return response;
  }
}
