import { InjectRepository } from '@nestjs/typeorm';
import { Email } from 'src/auth/core/domain/value-object/email';
import { Username } from 'src/auth/core/domain/value-object/username';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { Repository } from 'typeorm';
import { RegisterRepository } from '../application/adapter/register.repository';
import { User } from '../domain/entity/user';

export class RegisterTypeOrmMySqlRepository implements RegisterRepository {
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
  ) {}

  async getOneUserIdByUsername(username: Username): Promise<Uuid | null> {
    const ormUser = await this.userRepository.findOne({
      where: { username: username.val },
    });
    if (ormUser === undefined) return null;
    return Uuid.fromExisting(ormUser.id);
  }

  async getOneUserIdByEmail(email: Email): Promise<Uuid | null> {
    const ormUser = await this.userRepository.findOne({
      where: { email: email.val },
    });
    if (ormUser === undefined) return null;
    return Uuid.fromExisting(ormUser.id);
  }

  async saveNewUser(user: User): Promise<void> {
    await this.userRepository.save({
      id: user.id.val,
      email: user.email.val,
      hashedPassword: user.hashedPassword.val,
      username: user.username.val,
    });
  }
}
