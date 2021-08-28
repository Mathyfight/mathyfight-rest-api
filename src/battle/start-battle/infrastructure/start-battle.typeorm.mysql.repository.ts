import { InjectRepository } from '@nestjs/typeorm';
import { BattleTypeOrmMySql } from 'src/database/typeorm/mysql/entity/battle.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic-level.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { StartBattleRepository } from '../adapter/interface/start-battle.repository';
import { StartBattleCommand } from '../domain/command/start-battle.command';
import { Avatar } from '../domain/entity/avatar';
import { Equipment } from '../domain/entity/equipment';
import { MathTopicLevel } from '../domain/entity/math-topic-level';
import { UnlockedLevel } from '../domain/entity/unlocked-level';
import { User } from '../domain/entity/user';

export class StartBattleTypeOrmMySqlRepository
  implements StartBattleRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(MathTopicLevelTypeOrmMySql)
    readonly mathTopicLevelRepository: Repository<MathTopicLevelTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async getMathTopicLevelById(
    mathTopicLevelId: string,
  ): Promise<MathTopicLevel | null> {
    const ormMathTopicLevel = await this.mathTopicLevelRepository.findOne({
      where: { id: mathTopicLevelId },
      relations: ['level'],
    });
    if (ormMathTopicLevel === undefined) return null;
    return new MathTopicLevel(
      ormMathTopicLevel.id,
      ormMathTopicLevel.level.enemyMaxHealth,
      ormMathTopicLevel.level.enemyDefense,
    );
  }

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId, {
      relations: [
        'player',
        'player.avatar',
        'player.avatar.equipments',
        'player.avatar.equipments.equipment',
        'player.unlockedMathTopicLevels',
        'player.unlockedMathTopicLevels.mathTopicLevel',
      ],
    });
    if (ormUser === undefined) return null;
    return new User(
      ormUser.player === null
        ? null
        : new Avatar(
            ormUser.player.avatar.id,
            ormUser.player.avatar.maxHealth,
            ormUser.player.avatar.baseDefense,
            ormUser.player.id,
            ormUser.player.avatar.equipments
              .filter((e) => e.equipped)
              .map((e) => new Equipment(e.equipment.defense)),
          ),
      ormUser.player === null
        ? []
        : ormUser.player.unlockedMathTopicLevels.map(
            (umtl) => new UnlockedLevel(umtl.id, umtl.mathTopicLevel.id),
          ),
    );
  }

  async startBattle(cmd: StartBattleCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.insert(BattleTypeOrmMySql, {
        id: cmd.battleId,
        abandoned: cmd.abandoned,
        enemyHealth: cmd.enemyHealth,
        enemyDefense: cmd.enemyDefense,
        avatarHealth: cmd.avatarHealth,
        avatarDefense: cmd.avatarDefense,
        playerUnlockedMathTopicLevel: { id: cmd.unlockedMathTopicLevelId },
      });
    });
  }
}
