import { InjectRepository } from '@nestjs/typeorm';
import { BattleTypeOrmMySql } from 'src/database/typeorm/mysql/entity/battle.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetEnemyOfBattleRepository } from '../adapter/interface/get-enemy-of-battle.repository';
import { Battle } from '../domain/entity/battle';
import { Enemy } from '../domain/entity/enemy';

export class GetEnemyOfBattleTypeOrmMySqlRepository
  implements GetEnemyOfBattleRepository
{
  constructor(
    @InjectRepository(BattleTypeOrmMySql)
    private readonly battleRepository: Repository<BattleTypeOrmMySql>,
  ) {}

  async getBattleById(battleId: string): Promise<Battle | null> {
    const ormBattle = await this.battleRepository.findOne({
      where: { id: battleId },
      relations: [
        'playerUnlockedMathTopicLevel',
        'playerUnlockedMathTopicLevel.player',
        'playerUnlockedMathTopicLevel.player.user',
        'playerUnlockedMathTopicLevel.mathTopicLevel',
        'playerUnlockedMathTopicLevel.mathTopicLevel.enemy',
        'playerUnlockedMathTopicLevel.mathTopicLevel.level',
      ],
    });
    if (ormBattle === undefined) return null;
    return new Battle(
      ormBattle.playerUnlockedMathTopicLevel.player.user.id,
      new Enemy(
        ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.enemy.name,
        ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.level.enemyMaxHealth,
        ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.level.enemyAttack,
        ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.level.enemyDefense,
        ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.enemy.imageUrl,
      ),
    );
  }
}
