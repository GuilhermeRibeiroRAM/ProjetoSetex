import { MachineStatusEnum } from '@/business/enums/machine-status.enum';

export interface IQueryOptions {
  currentPage: number;
  pageSize: number;
  sort?: string;
  order?: string;
  search?: string;
  columnsComparison?: string[];
  status?: MachineStatusEnum;
}
