import {
  CustomErrorViewModel,
  CustomResponseViewModel,
} from '@/api/view-models/common/custom-response';

export function customResponse<T>(
  content?: T | null,
  status?: number,
): {
  error: CustomErrorViewModel;
  data?: T | null;
  status: number;
} {
  const response: CustomResponseViewModel<T> = {
    status: 400,
    data: {} as T | null,
    error: {} as CustomErrorViewModel,
  };

  if (content) {
    response.status = 200;
    response.data = content;
  }

  return response;
}
