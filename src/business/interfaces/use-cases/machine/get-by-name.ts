import { IMachine } from '@/business/model/machine.interface';

export interface IGetMachineByName {
  execute(id: string): Promise<IMachine>;
}
