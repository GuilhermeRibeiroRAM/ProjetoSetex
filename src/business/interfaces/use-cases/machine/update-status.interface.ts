import { MachineStatusEnum } from '@/business/enums/machine-status.enum';

export interface IUpdateStatusMachine {
  execute(id: string, status: MachineStatusEnum): Promise<boolean>;
}
