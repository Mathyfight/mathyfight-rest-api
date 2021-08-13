import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MathProblemTypeOrmMySql } from './math-problem.typeorm.mysql';

@Entity('math_answer')
export class MathAnswerTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'description', length: 200, nullable: false })
  description: string;

  @Column('boolean', { name: 'is_correct', nullable: false })
  isCorrect: boolean;

  @ManyToOne(() => MathProblemTypeOrmMySql, (area) => area.mathAnswers, {
    nullable: false,
  })
  @JoinColumn({ name: 'math_problem_id' })
  mathProblem: MathProblemTypeOrmMySql;

  constructor(
    id: string,
    description: string,
    isCorrect: boolean,
    mathProblem: MathProblemTypeOrmMySql,
  ) {
    this.id = id;
    this.description = description;
    this.isCorrect = isCorrect;
    this.mathProblem = mathProblem;
  }
}
