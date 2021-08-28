import { InjectRepository } from '@nestjs/typeorm';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { BattleTypeOrmMySql } from 'src/database/typeorm/mysql/entity/battle.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { AbandonBattleRepository } from '../adapter/interface/abandon-battle.repository';
import { AbandonBattleCommand } from '../domain/command/abandon-battle.command';
import { Avatar } from '../domain/entity/avatar';
import { Battle } from '../domain/entity/battle';

export class AbandonBattleTypeOrmMySqlRepository
  implements AbandonBattleRepository
{
  constructor(
    @InjectRepository(AvatarTypeOrmMySql)
    readonly avatarRepository: Repository<AvatarTypeOrmMySql>,
    @InjectRepository(BattleTypeOrmMySql)
    readonly battleRepository: Repository<BattleTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async getAvatarByUserId(userId: string): Promise<Avatar | null> {
    const ormAvatar = await this.avatarRepository
      .createQueryBuilder('a')
      .innerJoin('a.player', 'p')
      .where('p.user_id = :userId', { userId })
      .getOne();
    if (ormAvatar === undefined) return null;
    return new Avatar(ormAvatar.id);
  }

  async getBattleById(id: string): Promise<Battle | null> {
    const ormBattle = await this.battleRepository.findOne(id, {
      relations: [
        'playerUnlockedMathTopicLevel',
        'playerUnlockedMathTopicLevel.player',
        'playerUnlockedMathTopicLevel.player.avatar',
      ],
    });
    if (ormBattle === undefined) return null;
    return new Battle(
      ormBattle.id,
      ormBattle.enemyHealth,
      ormBattle.avatarHealth,
      ormBattle.abandoned,
      ormBattle.playerUnlockedMathTopicLevel.player.avatar.id,
    );
  }

  async abandonBattle(cmd: AbandonBattleCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.update(BattleTypeOrmMySql, cmd.battleId, {
        abandoned: cmd.abandonBattle,
      });
    });
  }
}
