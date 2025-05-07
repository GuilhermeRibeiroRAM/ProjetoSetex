import { IMachine } from '@/business/model/machine.interface';

export interface IGetAllMachineRepository {
  execute(): Promise<IMachine[]>;
}
