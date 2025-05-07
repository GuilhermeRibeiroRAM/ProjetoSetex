import { MachineStatusEnum } from '@/business/enums/machine-status.enum';

export interface IMachine {
  id: string;
  name: string;
  sensorIdentifier?: string;
  sensorIdentifier2?: string;
  status: MachineStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  lastVelocity?: number;
  productionOrder?: string;
}
