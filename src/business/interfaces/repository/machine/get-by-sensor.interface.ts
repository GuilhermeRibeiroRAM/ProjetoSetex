import { IMachine } from '@/business/model/machine.interface';

export interface IGetMachineBySensorIdentifierRepository {
  execute(sensor: string): Promise<IMachine | null>;
}
