import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordTokenTypeOrmMySql } from 'src/database/typeorm/mysql/entity/reset-password-token.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { ResetPasswordRepository } from '../adapter/interface/reset-password.repository';
import { ResetPasswordCommand } from '../domain/command/reset-password.command';
import { ResetPasswordToken } from '../domain/entity/reset-password-token';

export class ResetPasswordTypeOrmMySqlRepository
  implements ResetPasswordRepository
{
  constructor(
    @InjectRepository(ResetPasswordTokenTypeOrmMySql)
    readonly resetPasswordTokenRepository: Repository<ResetPasswordTokenTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async resetPassword(cmd: ResetPasswordCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.update(
        ResetPasswordTokenTypeOrmMySql,
        cmd.disableToken.tokenId,
        { hasBeenUsed: cmd.disableToken.hasBeenUsed },
      );
      await manager.update(UserTypeOrmMySql, cmd.changeUserPassword.userId, {
        hashedPassword: cmd.changeUserPassword.newHashedPassword,
      });
    });
  }

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
}
