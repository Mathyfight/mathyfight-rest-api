import { InjectRepository } from '@nestjs/typeorm';
import { Username } from 'src/auth/core/domain/value-object/username';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { LoginRepository } from '../application/adapter/login.repository';
import { User } from '../domain/entity/user';

export class LoginTypeOrmMySqlRepository implements LoginRepository {
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
  ) {}

  async getOneUserByUsername(username: Username): Promise<User | null> {
    const ormUser = await this.userRepository.findOne({
      where: { username: username.val },
    });
    if (ormUser === undefined) return null;
    return User.fromExisting(
      ormUser.id,
      ormUser.username,
      ormUser.hashedPassword,
    );
  }
}
