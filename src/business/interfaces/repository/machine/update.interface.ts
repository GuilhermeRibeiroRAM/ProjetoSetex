import { IMachine } from '@/business/model/machine.interface';

export interface IUpdateMachineRepository {
  execute(id: string, data: Partial<IMachine>): Promise<boolean>;
}
