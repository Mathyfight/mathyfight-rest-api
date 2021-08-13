import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MathProblemTypeOrmMySql } from './math-problem.typeorm.mysql';

@Entity('difficulty')
export class DifficultyTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'name', length: 64, nullable: false })
  name: string;

  @Column('float', { name: 'damage_multiplier', nullable: false })
  damageMultiplier: number;

  @Column('integer', { name: 'max_seconds', nullable: false })
  maxSeconds: number;

  @OneToMany(
    () => MathProblemTypeOrmMySql,
    (mathProblem) => mathProblem.difficulty,
  )
  mathProblems: MathProblemTypeOrmMySql[];

  constructor(
    id: string,
    name: string,
    damageMultiplier: number,
    maxSeconds: number,
    mathProblems: MathProblemTypeOrmMySql[],
  ) {
    this.id = id;
    this.name = name;
    this.damageMultiplier = damageMultiplier;
    this.maxSeconds = maxSeconds;
    this.mathProblems = mathProblems;
  }
}
