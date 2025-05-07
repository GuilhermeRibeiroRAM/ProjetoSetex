import { ApiDefaultResponse } from '@nestjs/swagger';

type DefaultResponse<T> = {
  sucess: boolean;
  data: {
    value: T;
  };
};
export default DefaultResponse;
