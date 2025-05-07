import { IMachine } from '@/business/model/machine.interface';

export interface IGetMachineByIdRepository {
  execute(id: string): Promise<IMachine | null>;
}
