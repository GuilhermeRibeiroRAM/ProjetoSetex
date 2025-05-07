import { IMachine } from '@/business/model/machine.interface';

export interface IGetMachineByNameRepository {
  execute(name: string): Promise<IMachine | null>;
}
