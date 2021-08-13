import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MathTopicLevelTypeOrmMySql } from './math-topic-level.typeorm.mysql';

@Entity('level')
export class LevelTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('integer', { name: 'number', nullable: false })
  number: number;

  @Column('integer', { name: 'gold_gained', nullable: false })
  goldGained: number;

  @Column('integer', { name: 'experience_gained', nullable: false })
  experienceGained: number;

  @Column('integer', { name: 'enemy_max_health', nullable: false })
  enemyMaxHealth: number;

  @Column('integer', { name: 'enemy_attack', nullable: false })
  enemyAttack: number;

  @Column('integer', { name: 'enemy_defense', nullable: false })
  enemyDefense: number;

  @OneToMany(
    () => MathTopicLevelTypeOrmMySql,
    (mathTopicLevel) => mathTopicLevel.mathTopic,
  )
  mathTopicLevels: MathTopicLevelTypeOrmMySql[];

  constructor(
    id: string,
    number: number,
    goldGained: number,
    experienceGained: number,
    enemyMaxHealth: number,
    enemyAttack: number,
    enemyDefense: number,
    mathTopicLevels: MathTopicLevelTypeOrmMySql[],
  ) {
    this.id = id;
    this.number = number;
    this.goldGained = goldGained;
    this.experienceGained = experienceGained;
    this.enemyMaxHealth = enemyMaxHealth;
    this.enemyAttack = enemyAttack;
    this.enemyDefense = enemyDefense;
    this.mathTopicLevels = mathTopicLevels;
  }
}
