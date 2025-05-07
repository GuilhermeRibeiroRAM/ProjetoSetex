import { IMachine } from '@/business/model/machine.interface';

export interface IGetAllMachine {
  execute(): Promise<IMachine[]>;
}
