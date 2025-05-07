import { CustomResponseViewModel } from '@/api/view-models/common/custom-response';
import { IMachine } from '@/business/model/machine.interface';
export interface ICreateMachine<IMachine> {
  execute(data: IMachine): Promise<CustomResponseViewModel<string | null>>;
}
