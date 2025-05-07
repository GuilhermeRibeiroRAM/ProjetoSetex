import { CustomResponseViewModel } from '@/api/view-models/common/custom-response';
import { IMachine } from '@/business/model/machine.interface';
export interface IUpdateMachine<IMachine> {
  execute(
    id: string,
    data: Partial<IMachine>,
  ): Promise<CustomResponseViewModel<boolean | null>>;
}
