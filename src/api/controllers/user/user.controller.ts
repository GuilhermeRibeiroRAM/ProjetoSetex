import { CreateUserDataModel } from '@/api/data-models/user/create-user.dm';
import { UpdateUserDataModel } from '@/api/data-models/user/update-user.dm';
import { UserViewModel } from '@/api/view-models/user/user.vm';
import { Public } from '@/business/common/decorators/public';
import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { PagedQuery } from '@/business/dtos/common/paged-query';
import { mapper } from '@/business/mapper/mapper';
import { UserMapper } from '@/business/mapper/profile/user';
import CreateUser from '@/use-cases/user/create';
import DeleteUser from '@/use-cases/user/delete';
import GetUserByEmail from '@/use-cases/user/get-by-email';
import GetUserById from '@/use-cases/user/get-by-id';
import GetPagedUser from '@/use-cases/user/get-paged';
import UpdateUser from '@/use-cases/user/update';
import ResetPassword from '@/use-cases/user/reset-password';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import UpdatePassword from '@/use-cases/user/update-password';
import { IUser } from '@/business/model/user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject(TOKENS.CreateUserService)
    private readonly createUserService: CreateUser,
    @Inject(TOKENS.UpdateUserService)
    private readonly updateUserService: UpdateUser,
    @Inject(TOKENS.DeleteUserService)
    private readonly deleteUserService: DeleteUser,
    @Inject(TOKENS.GetUserByIdService)
    private readonly getUserByIdService: GetUserById,
    @Inject(TOKENS.GetUserPagedService)
    private readonly getUserPagedService: GetPagedUser,
    @Inject(TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: GetUserByEmail,
    @Inject(TOKENS.ResetPasswordService)
    private readonly resetPasswordService: ResetPassword,
    @Inject(TOKENS.UpdatePasswordService)
    private readonly updatePasswordService: UpdatePassword,
  ) {}

  @Public()
  @Post('/create/')
  @ApiBody({
    type: CreateUserDataModel,
  })
  async create(@Body() data: CreateUserDataModel): Promise<IUser | null> {
    const dataMapped = mapper.map(UserMapper.CreateUserDataModelToIUser, data);

    return await this.createUserService.execute(dataMapped);
  }

  @Put('/update/:id')
  @ApiBody({
    type: UpdateUserDataModel,
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDataModel,
  ): Promise<boolean> {
    const response = await this.updateUserService.execute(id, data);

    return response;
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.deleteUserService.execute(id);
  }

  @Public()
  @Get('/get-by-id/:id')
  async get(@Param('id') id: string): Promise<any> {
    const result = await this.getUserByIdService.execute(id);

    const response = mapper.map(UserMapper.IUserToUserViewModel, result);

    return response;
  }

  @Get('/paged/')
  async getPaged(
    @Query('currentPage') currentPage: number,
    @Query('pageSize') pageSize: number,
    @Query('sort') sort?: string,
    @Query('order') order?: string,
    @Query('search') search?: string,
  ): Promise<PagedQuery<UserViewModel>> {
    const result = await this.getUserPagedService.execute({
      currentPage,
      pageSize,
      sort,
      order,
      search,
    });

    const response = mapper.map(UserMapper.IUserToUserViewModel, result.result);

    return {
      data: {
        result: response,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
      },
    };
  }

  @Public()
  @Get('/get-by-email/')
  async getByEmail(@Query('email') email: string): Promise<UserViewModel> {
    const result = await this.getUserByEmailService.execute(email);

    const response = mapper.map(UserMapper.IUserToUserViewModel, result);

    return response;
  }
  @Put('/resetPassword/:id')
  @ApiBody({
    type: UpdateUserDataModel,
  })
  async resetPassword(@Param('id') id: string): Promise<boolean> {
    const result = await this.resetPasswordService.execute(id);
    return result;
  }

  @Put('/update-password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdateUserDataModel,
  ): Promise<boolean> {
    const { password } = data;

    const result = await this.updatePasswordService.execute(id, password);

    return result;
  }
}
