import { IMachine } from '@/business/model/machine.interface';

export interface ICreateMachineRepository {
  execute(data: IMachine): Promise<string>;
}
