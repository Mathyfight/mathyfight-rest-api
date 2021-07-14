import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordTokenTypeOrmMySql } from 'src/database/typeorm/mysql/entity/reset-password-token.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { ForgotPasswordRepository } from '../adapter/interface/forgot-password.repository';
import { CreateResetPasswordToken } from '../domain/command/create-reset-password-token';
import { User } from '../domain/entity/user';

export class ForgotPasswordTypeOrmMySqlRepository
  implements ForgotPasswordRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(ResetPasswordTokenTypeOrmMySql)
    readonly resetPasswordtokenRepository: Repository<ResetPasswordTokenTypeOrmMySql>,
  ) {}

  async getUserIdByEmail(email: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (ormUser === undefined) return null;
    return new User(ormUser.id, ormUser.email);
  }

  async saveResetPasswordToken(
    command: CreateResetPasswordToken,
  ): Promise<void> {
    await this.resetPasswordtokenRepository.save({
      id: command.id,
      createdAt: command.createdAt.toISOString(),
      hasBeenUsed: command.hasBeenUsed,
      user: { id: command.userId },
    });
  }
}
