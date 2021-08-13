import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BattleTypeOrmMySql } from './battle.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from './math-topic-level.typeorm.mysql';
import { PlayerTypeOrmMySql } from './player.typeorm.mysql';

@Entity('player_unlocked_math_topic_level')
export class PlayerUnlockedMathTopicLevelTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @ManyToOne(
    () => PlayerTypeOrmMySql,
    (player) => player.unlockedMathTopicLevels,
    { nullable: false },
  )
  @JoinColumn({ name: 'player_id' })
  player: PlayerTypeOrmMySql;

  @ManyToOne(
    () => MathTopicLevelTypeOrmMySql,
    (mathTopicLevel) => mathTopicLevel.playerUnlockedMathTopicLevels,
    { nullable: false },
  )
  @JoinColumn({ name: 'math_topic_level_id' })
  mathTopicLevel: MathTopicLevelTypeOrmMySql;

  @OneToMany(
    () => BattleTypeOrmMySql,
    (battles) => battles.playerUnlockedMathTopicLevel,
  )
  battles: BattleTypeOrmMySql[];

  constructor(
    id: string,
    player: PlayerTypeOrmMySql,
    enemy: MathTopicLevelTypeOrmMySql,
    battles: BattleTypeOrmMySql[],
  ) {
    this.id = id;
    this.player = player;
    this.mathTopicLevel = enemy;
    this.battles = battles;
  }
}
