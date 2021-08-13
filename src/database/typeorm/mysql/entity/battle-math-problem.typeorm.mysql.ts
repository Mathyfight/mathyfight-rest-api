import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BattleTypeOrmMySql } from './battle.typeorm.mysql';
import { MathProblemTypeOrmMySql } from './math-problem.typeorm.mysql';

@Entity('battle_math_problem')
export class BattleMathProblemTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('boolean', {
    name: 'solved',
    nullable: false,
  })
  solved: boolean;

  @Column('datetime', {
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => BattleTypeOrmMySql, (battle) => battle.battleMathProblems, {
    nullable: false,
  })
  @JoinColumn({ name: 'battle_id' })
  battle: BattleTypeOrmMySql;

  @ManyToOne(
    () => MathProblemTypeOrmMySql,
    (mathProblem) => mathProblem.battles,
    { nullable: false },
  )
  @JoinColumn({ name: 'math_problem_id' })
  mathProblem: MathProblemTypeOrmMySql;

  constructor(
    id: string,
    solved: boolean,
    createdAt: Date,
    battle: BattleTypeOrmMySql,
    mathProblem: MathProblemTypeOrmMySql,
  ) {
    this.id = id;
    this.solved = solved;
    this.createdAt = createdAt;
    this.battle = battle;
    this.mathProblem = mathProblem;
  }
}
