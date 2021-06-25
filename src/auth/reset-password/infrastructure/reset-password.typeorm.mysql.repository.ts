import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordTokenTypeOrmMySql } from 'src/database/typeorm/mysql/entity/reset-password-token.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { ResetPasswordRepository } from '../application/adapter/reset-password.repository';
import { ChangeUserPassword } from '../domain/command/change-user-password';
import { DisableToken } from '../domain/command/disable-token';
import { ResetPasswordToken } from '../domain/entity/reset-password-token';

export class ResetPasswordTypeOrmMySqlRepository
  implements ResetPasswordRepository
{
  constructor(
    @InjectRepository(ResetPasswordTokenTypeOrmMySql)
    readonly resetPasswordTokenRepository: Repository<ResetPasswordTokenTypeOrmMySql>,
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
  ) {}

  async getTokenById(id: string): Promise<ResetPasswordToken | null> {
    const ormToken = await this.resetPasswordTokenRepository.findOne(id, {
      relations: ['user'],
    });
    if (ormToken === undefined) return null;
    return new ResetPasswordToken(
      ormToken.id,
      ormToken.hasBeenUsed,
      ormToken.user.id,
    );
  }

  async disableToken(command: DisableToken): Promise<void> {
    await this.resetPasswordTokenRepository.save({
      id: command.tokenId,
      hasBeenUsed: command.hasBeenUsed,
    });
  }

  async changeUserPassword(command: ChangeUserPassword): Promise<void> {
    await this.userRepository.save({
      id: command.userId,
      hashedPassword: command.newHashedPassword,
    });
  }
}
