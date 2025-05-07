import { UserViewModel } from '@/api/view-models/user/user.vm';

export interface LoginResponseViewModel {
  expiresAccessToken: Date;
  user: UserViewModel;
  shouldUpdatePassword?: boolean;
}
