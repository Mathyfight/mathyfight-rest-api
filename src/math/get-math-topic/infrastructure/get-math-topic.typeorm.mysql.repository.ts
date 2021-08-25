import { InjectRepository } from '@nestjs/typeorm';
import { MathTopicTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player-unlocked-math-topic-level.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetMathTopicRepository } from '../adapter/interface/get-math-topic.repository';
import { Enemy, Level, MathTopic } from '../domain/entity/math-topic';
import { User } from '../domain/entity/user';

export class GetMathTopicTypeOrmMySqlRepository
  implements GetMathTopicRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(MathTopicTypeOrmMySql)
    readonly mathTopicRepository: Repository<MathTopicTypeOrmMySql>,
    @InjectRepository(PlayerUnlockedMathTopicLevelTypeOrmMySql)
    readonly playerUnlockedMathTopicLevelRepository: Repository<PlayerUnlockedMathTopicLevelTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId, {
      relations: ['player'],
    });
    if (ormUser === undefined || ormUser.player === null) return null;
    return new User(ormUser.player.id);
  }

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
        .innerJoinAndSelect('pumtl.mathTopicLevel', 'mtl')
        .where('pumtl.player_id = :playerId', { playerId })
        .andWhere('mtl.math_topic_id = :mathTopicId', { mathTopicId })
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
