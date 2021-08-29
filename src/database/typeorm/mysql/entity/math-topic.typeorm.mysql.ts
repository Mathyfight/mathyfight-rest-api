import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { MathAreaTypeOrmMySql } from './math-area.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from './math-topic-level.typeorm.mysql';
import { MathProblemTypeOrmMySql } from './math-problem.typeorm.mysql';

@Entity('math_topic')
export class MathTopicTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'name', length: 64, nullable: false })
  name: string;

  @Column('varchar', { name: 'description', length: 200, nullable: false })
  description: string;

  @Column('varchar', { name: 'image_url', length: 2048, nullable: false })
  imageUrl: string;

  @Column('bool', { name: 'is_active', nullable: false })
  isActive!: boolean;

  @ManyToOne(() => MathAreaTypeOrmMySql, (area) => area.mathTopics, {
    nullable: false,
  })
  @JoinColumn({ name: 'math_area_id' })
  mathArea: MathAreaTypeOrmMySql;

  @OneToMany(
    () => MathProblemTypeOrmMySql,
    (mathProblem) => mathProblem.mathTopic,
  )
  mathProblems: MathProblemTypeOrmMySql[];

  @OneToMany(
    () => MathTopicLevelTypeOrmMySql,
    (mathTopicLevel) => mathTopicLevel.mathTopic,
  )
  mathTopicLevels: MathTopicLevelTypeOrmMySql[];

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    mathArea: MathAreaTypeOrmMySql,
    mathProblems: MathProblemTypeOrmMySql[],
    mathTopicLevels: MathTopicLevelTypeOrmMySql[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.mathArea = mathArea;
    this.mathProblems = mathProblems;
    this.mathTopicLevels = mathTopicLevels;
  }
}
