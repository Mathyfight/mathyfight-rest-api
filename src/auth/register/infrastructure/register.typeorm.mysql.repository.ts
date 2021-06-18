import { InjectRepository } from '@nestjs/typeorm';
import { Email } from 'src/auth/core/domain/value-objects/email';
import { Username } from 'src/auth/core/domain/value-objects/username';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entities/user.typeorm.mysql';
import { Uuid } from 'src/shared/domain/value-objects/general/uuid';
import { Raw, Repository } from 'typeorm';
import { RegisterRepository } from '../domain/adapters/register.repository';
import { User } from '../domain/entities/user';

export class RegisterTypeOrmMySqlRepository implements RegisterRepository {
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
  ) {}

  async getOneUserIdByUsername(username: Username): Promise<Uuid | null> {
    const ormUser = await this.userRepository.findOne({
      where: {
        username: Raw((alias) => `${alias} = LOWER('${username.val}')`),
      },
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
