import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BattleMathProblemTypeOrmMySql } from './battle-math-problem.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from './player-unlocked-math-topic-level.typeorm.mysql';

@Entity('battle')
export class BattleTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('boolean', { name: 'abandoned', nullable: false })
  abandoned: boolean;

  @Column('integer', { name: 'enemy_health', nullable: false })
  enemyHealth: number;

  @Column('integer', { name: 'enemy_defense', nullable: false })
  enemyDefense: number;

  @Column('integer', { name: 'avatar_health', nullable: false })
  avatarHealth: number;

  @Column('integer', { name: 'avatar_defense', nullable: false })
  avatarDefense: number;

  @ManyToOne(
    () => PlayerUnlockedMathTopicLevelTypeOrmMySql,
    (playerUnlockedMathTopicLevel) => playerUnlockedMathTopicLevel.battles,
    { nullable: false },
  )
  @JoinColumn({ name: 'player_unlocked_math_topic_level_id' })
  playerUnlockedMathTopicLevel: PlayerUnlockedMathTopicLevelTypeOrmMySql;

  @OneToMany(
    () => BattleMathProblemTypeOrmMySql,
    (mathProblem) => mathProblem.battle,
  )
  battleMathProblems: BattleMathProblemTypeOrmMySql[];

  constructor(
    id: string,
    abandoned: boolean,
    enemyHealth: number,
    enemyDefense: number,
    avatarHealth: number,
    avatarDefense: number,
    playerUnlockedMathTopicLevel: PlayerUnlockedMathTopicLevelTypeOrmMySql,
    mathAnswers: BattleMathProblemTypeOrmMySql[],
  ) {
    this.id = id;
    this.abandoned = abandoned;
    this.enemyHealth = enemyHealth;
    this.enemyDefense = enemyDefense;
    this.avatarHealth = avatarHealth;
    this.avatarDefense = avatarDefense;
    this.playerUnlockedMathTopicLevel = playerUnlockedMathTopicLevel;
    this.battleMathProblems = mathAnswers;
  }
}
