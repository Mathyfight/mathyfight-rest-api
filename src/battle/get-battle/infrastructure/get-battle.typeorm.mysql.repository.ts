import { InjectRepository } from '@nestjs/typeorm';
import { BattleTypeOrmMySql } from 'src/database/typeorm/mysql/entity/battle.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic-level.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetBattleRepository } from '../adapter/interface/get-battle.repository';
import { Avatar } from '../domain/entity/avatar';
import { Battle } from '../domain/entity/battle';
import { User } from '../domain/entity/user';

export class GetBattleTypeOrmMySqlRepository implements GetBattleRepository {
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(BattleTypeOrmMySql)
    private readonly battleRepository: Repository<BattleTypeOrmMySql>,
    @InjectRepository(MathTopicLevelTypeOrmMySql)
    private readonly mathTopicLevelRepository: Repository<MathTopicLevelTypeOrmMySql>,
  ) {}

  async getBattle(battleId: string): Promise<Battle | null> {
    const ormbattle = await this.battleRepository.findOne(battleId, {
      relations: [
        'playerUnlockedMathTopicLevel',
        'playerUnlockedMathTopicLevel.player',
        'playerUnlockedMathTopicLevel.mathTopicLevel',
        'playerUnlockedMathTopicLevel.mathTopicLevel.mathTopic',
        'playerUnlockedMathTopicLevel.mathTopicLevel.level',
        'playerUnlockedMathTopicLevel.player.avatar',
      ],
    });
    if (ormbattle === undefined) return null;

    const ormNextLevel = await this.mathTopicLevelRepository
      .createQueryBuilder('mtl')
      .innerJoin('mtl.level', 'l')
      .where('mtl.math_topic_id = :id', {
        id: ormbattle.playerUnlockedMathTopicLevel.mathTopicLevel.mathTopic.id,
      })
      .andWhere('l.number = :levelNumber', {
        levelNumber:
          ormbattle.playerUnlockedMathTopicLevel.mathTopicLevel.level.number +
          1,
      })
      .getOne();

    return new Battle(
      new Avatar(
        ormbattle.playerUnlockedMathTopicLevel.player.avatar.id,
        ormbattle.avatarHealth,
        ormbattle.avatarDefense,
        ormbattle.playerUnlockedMathTopicLevel.player.avatar.currentExperience,
        ormbattle.playerUnlockedMathTopicLevel.player.avatar.level,
      ),
      ormbattle.enemyHealth,
      ormbattle.enemyDefense,
      ormNextLevel === undefined ? null : ormNextLevel.id,
      ormbattle.playerUnlockedMathTopicLevel.mathTopicLevel.level.experienceGained,
    );
  }

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId, {
      relations: ['player', 'player.avatar'],
    });
    if (ormUser === undefined) return null;
    return new User(ormUser.player === null ? null : ormUser.player.avatar.id);
  }
}
