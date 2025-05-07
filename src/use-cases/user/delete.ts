import { TOKENS } from '@/business/di/tokens';
import { IDeleteUserRepository } from '@/business/interfaces/repository/user/delete.interface';
import { IDelete } from '@/business/interfaces/use-cases/base/delete.interface';
import { Inject } from '@nestjs/common';

export default class DeleteUser implements IDelete {
  constructor(
    @Inject(TOKENS.DeleteUserRepository)
    private readonly deleteUserRepository: IDeleteUserRepository,
  ) {}
  async execute(id: string): Promise<boolean> {
    const response = await this.deleteUserRepository.execute(id);
    return response;
  }
}
