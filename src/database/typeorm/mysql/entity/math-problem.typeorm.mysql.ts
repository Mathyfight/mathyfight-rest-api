import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BattleMathProblemTypeOrmMySql } from './battle-math-problem.typeorm.mysql';
import { DifficultyTypeOrmMySql } from './difficulty.typeorm.mysql';
import { MathAnswerTypeOrmMySql } from './math-answer.typeorm.mysql';
import { MathTopicTypeOrmMySql } from './math-topic.typeorm.mysql';

@Entity('math_problem')
export class MathProblemTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'description', length: 200, nullable: false })
  description: string;

  @Column('varchar', { name: 'image_url', length: 2048, nullable: true })
  imageUrl: string | null;

  @ManyToOne(
    () => MathTopicTypeOrmMySql,
    (mathTopic) => mathTopic.mathProblems,
    { nullable: false },
  )
  @JoinColumn({ name: 'math_topic_id' })
  mathTopic: MathTopicTypeOrmMySql;

  @ManyToOne(
    () => DifficultyTypeOrmMySql,
    (difficulty) => difficulty.mathProblems,
    { nullable: false },
  )
  @JoinColumn({ name: 'difficulty_id' })
  difficulty: DifficultyTypeOrmMySql;

  @OneToMany(
    () => MathAnswerTypeOrmMySql,
    (mathAnswer) => mathAnswer.mathProblem,
  )
  mathAnswers: MathAnswerTypeOrmMySql[];

  @OneToMany(
    () => BattleMathProblemTypeOrmMySql,
    (battle) => battle.mathProblem,
  )
  battles: BattleMathProblemTypeOrmMySql[];

  constructor(
    id: string,
    description: string,
    imnageUrl: string,
    mathTopic: MathTopicTypeOrmMySql,
    difficulty: DifficultyTypeOrmMySql,
    mathAnswers: MathAnswerTypeOrmMySql[],
    battles: BattleMathProblemTypeOrmMySql[],
  ) {
    this.id = id;
    this.description = description;
    this.imageUrl = imnageUrl;
    this.mathTopic = mathTopic;
    this.difficulty = difficulty;
    this.mathAnswers = mathAnswers;
    this.battles = battles;
  }
}
