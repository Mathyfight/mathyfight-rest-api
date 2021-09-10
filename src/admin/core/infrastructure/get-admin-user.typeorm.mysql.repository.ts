import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetAdminUserRepository } from '../adapter/interface/get-admin-user.repository';
import { AdminUser } from '../domain/entity/admin-user';

export class GetAdminUserTypeOrmMySqlRepository
  implements GetAdminUserRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
  ) {}

  async getAdmin(userId: string): Promise<AdminUser | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new AdminUser(ormUser.isAdmin);
  }
}
