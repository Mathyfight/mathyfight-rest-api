import { InjectRepository } from '@nestjs/typeorm';
import { MathTopicTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player-unlocked-math-topic-level.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetMathTopicRepository } from '../adapter/interface/get-math-topic.repository';
import { Enemy, Level, MathTopic } from '../domain/entity/math-topic';

export class GetMathTopicTypeOrmMySqlRepository
  implements GetMathTopicRepository
{
  constructor(
    @InjectRepository(MathTopicTypeOrmMySql)
    readonly mathTopicRepository: Repository<MathTopicTypeOrmMySql>,
    @InjectRepository(PlayerUnlockedMathTopicLevelTypeOrmMySql)
    readonly playerUnlockedMathTopicLevelRepository: Repository<PlayerUnlockedMathTopicLevelTypeOrmMySql>,
  ) {}

  async getMathTopic(
    mathTopicId: string,
    playerId: string,
  ): Promise<MathTopic | null> {
    const ormMathTopic = await this.mathTopicRepository.findOne(mathTopicId, {
      relations: [
        'mathTopicLevels',
        'mathTopicLevels.level',
        'mathTopicLevels.enemy',
      ],
    });

    if (ormMathTopic === undefined) return null;

    const ormPlayerUnlockedMathTopicLevels =
      await this.playerUnlockedMathTopicLevelRepository
        .createQueryBuilder('pumtl')
        .where('pumtl.player_id = :playerId', { playerId })
        .innerJoinAndSelect('pumtl.mathTopicLevel', 'mtl')
        .where('mtl.math_topic_id = :mathTopicId', { mathTopicId })
        .getMany();

    const mathTopic = new MathTopic(
      ormMathTopic.id,
      ormMathTopic.name,
      ormMathTopic.description,
      ormMathTopic.imageUrl,
      ormMathTopic.mathTopicLevels.map(
        (l) =>
          new Level(
            l.id,
            l.level.number,
            l.level.goldGained,
            l.level.experienceGained,
            ormPlayerUnlockedMathTopicLevels.some(
              (pumtl) => pumtl.mathTopicLevel.id === l.id,
            ),
            new Enemy(
              l.enemy.id,
              l.enemy.name,
              l.enemy.imageUrl,
              l.level.enemyMaxHealth,
              l.level.enemyAttack,
              l.level.enemyDefense,
            ),
          ),
      ),
    );
    return mathTopic;
  }
}
