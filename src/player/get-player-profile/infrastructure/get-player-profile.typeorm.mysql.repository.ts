import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetPlayerProfileRepository } from '../adapter/interface/get-player-profile.repository';
import { User } from '../domain/entity/user';

export class GetPlayerProfileTypeOrmMySqlRepository
  implements GetPlayerProfileRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.username, ormUser.email);
  }
}
