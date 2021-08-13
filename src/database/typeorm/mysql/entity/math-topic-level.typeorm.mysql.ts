import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { EnemyTypeOrmMySql } from './enemy.typeorm.mysql';
import { LevelTypeOrmMySql } from './level.typeorm.mysql';
import { MathTopicTypeOrmMySql } from './math-topic.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from './player-unlocked-math-topic-level.typeorm.mysql';

@Entity('math_topic_level')
@Unique(['mathTopic', 'enemy', 'level'])
export class MathTopicLevelTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @ManyToOne(
    () => MathTopicTypeOrmMySql,
    (mathTopic) => mathTopic.mathTopicLevels,
    { nullable: false },
  )
  @JoinColumn({ name: 'math_topic_id' })
  mathTopic: MathTopicTypeOrmMySql;

  @ManyToOne(() => EnemyTypeOrmMySql, (enemy) => enemy.mathTopicLevels, {
    nullable: false,
  })
  @JoinColumn({ name: 'enemy_id' })
  enemy: EnemyTypeOrmMySql;

  @ManyToOne(() => LevelTypeOrmMySql, (level) => level.mathTopicLevels, {
    nullable: false,
  })
  @JoinColumn({ name: 'level_id' })
  level: LevelTypeOrmMySql;

  @OneToMany(
    () => PlayerUnlockedMathTopicLevelTypeOrmMySql,
    (unlockedTopicLevels) => unlockedTopicLevels.mathTopicLevel,
  )
  playerUnlockedMathTopicLevels: PlayerUnlockedMathTopicLevelTypeOrmMySql[];

  constructor(
    id: string,
    mathTopic: MathTopicTypeOrmMySql,
    enemy: EnemyTypeOrmMySql,
    level: LevelTypeOrmMySql,
    unlockedMathTopicLevels: PlayerUnlockedMathTopicLevelTypeOrmMySql[],
  ) {
    this.id = id;
    this.mathTopic = mathTopic;
    this.enemy = enemy;
    this.level = level;
    this.playerUnlockedMathTopicLevels = unlockedMathTopicLevels;
  }
}
