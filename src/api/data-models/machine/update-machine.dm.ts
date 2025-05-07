import { MachineStatusEnum } from '@/business/enums/machine-status.enum';

export class UpdateMachineDataModel {
  id: string;
  name?: string;
  sensorIdentifier?: string;
  sensorIdentifier2?: string;
  status?: MachineStatusEnum;
}
