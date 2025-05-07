import { IMachine } from '@/business/model/machine.interface';

export interface IGetMachineBySensorIdentifier {
  execute(sensorCode: string): Promise<IMachine>;
}
