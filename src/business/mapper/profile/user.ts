import { CreateUserDataModel } from '@/api/data-models/user/create-user.dm';
import { UserViewModel } from '@/api/view-models/user/user.vm';
import { IUser } from '@/business/model/user.interface';
import { MappingPair, Profile as MappingProfile } from '@dynamic-mapper/mapper';

export class UserMapper extends MappingProfile {
  static readonly CreateUserDataModelToIUser = new MappingPair<
    CreateUserDataModel,
    IUser
  >();

  static readonly IUserToUserViewModel = new MappingPair<
    IUser,
    UserViewModel
  >();

  constructor() {
    super();

    this.createAutoMap(UserMapper.CreateUserDataModelToIUser, {
      id: (opt) => opt.ignore(),
    });

    this.createAutoMap(UserMapper.IUserToUserViewModel, {});
  }
}
