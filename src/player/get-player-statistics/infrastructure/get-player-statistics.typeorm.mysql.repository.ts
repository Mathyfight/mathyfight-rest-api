import { InjectRepository } from '@nestjs/typeorm';
import { BattleTypeOrmMySql } from 'src/database/typeorm/mysql/entity/battle.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetPlayerStatisticsRepository } from '../adapter/interface/get-player-statistics.repository';
import { BattleMathProblemMathAreaStatistics } from '../domain/entity/battle-math-problem-math-area-statistics';
import { BattleMathProblemMathTopicStatistics } from '../domain/entity/battle-math-problem-math-topic-statistics';
import {
  BattleMathProblemDifficultyStatistics,
  BattleMathProblemStatistics,
} from '../domain/entity/battle-math-problem-statistics';
import { BattleStatistics } from '../domain/entity/battle-statistics';
import { User } from '../domain/entity/user';

export class GetPlayerStatisticsTypeOrmMySqlRepository
  implements GetPlayerStatisticsRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(BattleTypeOrmMySql)
    private readonly battleRepository: Repository<BattleTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.id);
  }

  async getBattleStatistics(userId: string): Promise<BattleStatistics> {
    const ormStats: {
      readonly victories: string;
      readonly defeats: string;
      readonly battles: string;
    } = (
      await this.battleRepository.query(
        `select
    count(*) as battles,
    coalesce(sum(a.abandoned = 0 and a.enemy_defense = 0 and a.enemy_health = 0), 0) as victories,
    coalesce(sum(a.abandoned = 1 or (a.avatar_defense = 0 and a.avatar_health = 0)), 0) as defeats
  from
    (
    select
      b.id,
      b.abandoned,
      b.enemy_defense,
      b.enemy_health,
      b.avatar_defense,
      b.avatar_health
    from
      battle b
    join player_unlocked_math_topic_level pumtl on
      pumtl.id = b.player_unlocked_math_topic_level_id
    join player p on
      p.id = pumtl.player_id
    join \`user\` u on
      u.id = p.user_id
    where
      u.id = ? and ((b.enemy_defense = 0 and b.enemy_health = 0) or (b.avatar_defense = 0 and b.avatar_health = 0) or (b.abandoned = 1))
          ) as a;`,
        [userId],
      )
    )[0];

    return new BattleStatistics(
      Number(ormStats.victories),
      Number(ormStats.defeats),
      Number(ormStats.battles),
    );
  }

  async getBattleMathProblemStatistics(
    userId: string,
  ): Promise<BattleMathProblemStatistics> {
    const ormStats: {
      readonly total: string;
      readonly solved: string;
      readonly failed: string;
      readonly easyTotal: string;
      readonly easySolved: string;
      readonly easyFailed: string;
      readonly intermediateTotal: string;
      readonly intermediateSolved: string;
      readonly intermediateFailed: string;
      readonly advancedTotal: string;
      readonly advancedSolved: string;
      readonly advancedFailed: string;
    } = (
      await this.battleRepository.query(
        `select
      count(*) as total,
      coalesce(sum(a.solved = 1),0) as solved,
      coalesce(sum(a.solved = 0),0) as failed,
      coalesce(sum(a.difficulty_id = '64348b20-6e73-4b10-804e-cf212565ac73'),0) as easyTotal,
      coalesce(sum(a.difficulty_id = '64348b20-6e73-4b10-804e-cf212565ac73' and a.solved = 1),0) as easySolved,
      coalesce(sum(a.difficulty_id = '64348b20-6e73-4b10-804e-cf212565ac73' and a.solved = 0),0) as easyFailed,
      coalesce(sum(a.difficulty_id = '3b719e85-3eb5-46ba-b641-e21018299b77'),0) as intermediateTotal,
      coalesce(sum(a.difficulty_id = '3b719e85-3eb5-46ba-b641-e21018299b77' and a.solved = 1),0) as intermediateSolved,
      coalesce(sum(a.difficulty_id = '3b719e85-3eb5-46ba-b641-e21018299b77' and a.solved = 0),0) as intermediateFailed,
      coalesce(sum(a.difficulty_id = 'bce74b84-995f-49d9-acf3-798cf8847682'),0) as advancedTotal,
      coalesce(sum(a.difficulty_id = 'bce74b84-995f-49d9-acf3-798cf8847682' and a.solved = 1),0) as advancedSolved,
      coalesce(sum(a.difficulty_id = 'bce74b84-995f-49d9-acf3-798cf8847682' and a.solved = 0),0) as advancedFailed
    from
      (
      select
        bmp.id,
        bmp.solved,
        b.abandoned,
        b.enemy_defense,
        b.enemy_health,
        b.avatar_defense,
        b.avatar_health,
        d.id as difficulty_id
      from
        battle_math_problem bmp
      join battle b on
        b.id = bmp.battle_id
      join player_unlocked_math_topic_level pumtl on
        pumtl.id = b.player_unlocked_math_topic_level_id
      join player p on
        p.id = pumtl.player_id
      join \`user\` u on
        u.id = p.user_id
      join math_problem mp on
        mp.id = bmp.math_problem_id
      join difficulty d on
        d.id = mp.difficulty_id
      where
        u.id = ? and ((b.enemy_defense = 0 and b.enemy_health = 0) or (b.avatar_defense = 0 and b.avatar_health = 0) or (b.abandoned = 1))
            ) as a;`,
        [userId],
      )
    )[0];

    return new BattleMathProblemStatistics(
      Number(ormStats.total),
      Number(ormStats.solved),
      Number(ormStats.failed),
      {
        easy: new BattleMathProblemDifficultyStatistics(
          Number(ormStats.easyTotal),
          Number(ormStats.easySolved),
          Number(ormStats.easyFailed),
        ),
        intermediate: new BattleMathProblemDifficultyStatistics(
          Number(ormStats.intermediateTotal),
          Number(ormStats.intermediateSolved),
          Number(ormStats.intermediateFailed),
        ),
        advanced: new BattleMathProblemDifficultyStatistics(
          Number(ormStats.advancedTotal),
          Number(ormStats.advancedSolved),
          Number(ormStats.advancedFailed),
        ),
      },
    );
  }

  async getBattleMathProblemByMathAreaStatistics(
    userId: string,
  ): Promise<BattleMathProblemMathAreaStatistics[]> {
    const ormStats: [
      {
        readonly areaId: string;
        readonly name: string;
        readonly total: string;
        readonly solved: string;
        readonly failed: string;
      },
    ] = await this.battleRepository.query(
      `select 
    ma.id as areaId,
    ma.name as name,
    coalesce(b.total, 0) as total,
    coalesce(b.solved, 0) as solved,
    coalesce(b.failed, 0) as failed
  from
    math_area ma
  left join 
  (
    select
      a.math_area_id as areaId,
      a.math_area_name as name,
      count(a.bmp_id) as total,
      sum(a.solved = 1) as solved,
      sum(a.solved = 0) as failed
    from
      (
      select
        bmp.id as bmp_id,
        bmp.solved,
        b.abandoned,
        b.enemy_defense,
        b.enemy_health,
        b.avatar_defense,
        b.avatar_health,
        ma.name as math_area_name,
        ma.id as math_area_id
      from
        battle_math_problem bmp
      join battle b on
        b.id = bmp.battle_id
      join player_unlocked_math_topic_level pumtl on
        pumtl.id = b.player_unlocked_math_topic_level_id
      join player p on
        p.id = pumtl.player_id
      join \`user\` u on
        u.id = p.user_id
      join math_problem mp on
        mp.id = bmp.math_problem_id
      join math_topic mt on
        mt.id = mp.math_topic_id
      join math_area ma on
        ma.id = mt.math_area_id
      where
        u.id = ?
        and ((b.enemy_defense = 0
          and b.enemy_health = 0)
        or (b.avatar_defense = 0
          and b.avatar_health = 0)
        or (b.abandoned = 1))
          ) as a
    group by
      a.math_area_id
    ) as b
    on
    ma.id = b.areaId;`,
      [userId],
    );

    return ormStats.map(
      (s) =>
        new BattleMathProblemMathAreaStatistics(
          s.areaId,
          s.name,
          Number(s.total),
          Number(s.solved),
          Number(s.failed),
        ),
    );
  }

  async getBattleMathProblemByMathTopicStatistics(
    userId: string,
  ): Promise<BattleMathProblemMathTopicStatistics[]> {
    const ormStats: [
      {
        readonly topicId: string;
        readonly areaId: string;
        readonly name: string;
        readonly total: string;
        readonly solved: string;
        readonly failed: string;
      },
    ] = await this.battleRepository.query(
      `select 
    mt.id as topicId,
    mt.math_area_id as areaId,
    mt.name as name,
    coalesce(b.total, 0) as total,
    coalesce(b.solved, 0) as solved,
    coalesce(b.failed, 0) as failed
  from
    math_topic mt
  left join (
    select
      a.math_topic_id as topicId,
      a.math_area_id as areaId,
      a.math_topic_name as name,
      count(a.bmp_id) as total,
      sum(a.solved = 1) as solved,
      sum(a.solved = 0) as failed
    from
      (
      select
        bmp.id as bmp_id,
        bmp.solved,
        b.abandoned,
        b.enemy_defense,
        b.enemy_health,
        b.avatar_defense,
        b.avatar_health,
        mt.name as math_topic_name,
        mt.id as math_topic_id,
        mt.math_area_id as math_area_id
      from
        battle_math_problem bmp
      join battle b on
        b.id = bmp.battle_id
      join player_unlocked_math_topic_level pumtl on
        pumtl.id = b.player_unlocked_math_topic_level_id
      join player p on
        p.id = pumtl.player_id
      join \`user\` u on
        u.id = p.user_id
      join math_problem mp on
        mp.id = bmp.math_problem_id
      join math_topic mt on
        mt.id = mp.math_topic_id
      where
        u.id = ?
        and ((b.enemy_defense = 0
          and b.enemy_health = 0)
        or (b.avatar_defense = 0
          and b.avatar_health = 0)
        or (b.abandoned = 1))
          ) as a
    group by
      a.math_topic_id
    ) as b
  on
    mt.id = b.topicId;`,
      [userId],
    );

    return ormStats.map(
      (s) =>
        new BattleMathProblemMathTopicStatistics(
          s.topicId,
          s.areaId,
          s.name,
          Number(s.total),
          Number(s.solved),
          Number(s.failed),
        ),
    );
  }
}
