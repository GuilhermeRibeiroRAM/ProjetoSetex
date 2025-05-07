import { MachineStatusEnum } from '@/business/enums/machine-status.enum';

export class MachineViewModel {
  id: string;
  name: string;
  sensorIdentifier?: string;
  sensorIdentifier2?: string;
  status?: MachineStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
