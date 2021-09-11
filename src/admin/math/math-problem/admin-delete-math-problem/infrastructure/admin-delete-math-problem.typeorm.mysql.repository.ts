import { InjectRepository } from '@nestjs/typeorm';
import { MathAnswerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-answer.typeorm.mysql';
import { MathProblemTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-problem.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { AdminDeleteMathProblemRepository } from '../adapter/interface/admin-delete-math-problem.repository';
import { AdminDeleteMathProblemCommand } from '../domain/command/admin-delete-math-problem.command';
import { MathProblem } from '../domain/entity/math-problem';

export class AdminDeleteMathProblemTypeOrmMySqlRepository
  implements AdminDeleteMathProblemRepository
{
  constructor(
    @InjectRepository(MathProblemTypeOrmMySql)
    private readonly mathProblemRepository: Repository<MathProblemTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async getMathProblem(mathProblemId: string): Promise<MathProblem | null> {
    const ormMathProblem = await this.mathProblemRepository.findOne(
      mathProblemId,
      { relations: ['mathAnswers', 'battles'] },
    );
    if (ormMathProblem === undefined) return null;
    return new MathProblem(
      ormMathProblem.id,
      ormMathProblem.mathAnswers.map((a) => a.id),
      ormMathProblem.battles.map((b) => b.id),
      ormMathProblem.imageUrl,
    );
  }

  async deleteMathProblem(cmd: AdminDeleteMathProblemCommand): Promise<void> {
    this.connection.transaction('SERIALIZABLE', async (manager) => {
      if (cmd.mathProblem.mathAnswersIds.length > 0) {
        await manager.delete(
          MathAnswerTypeOrmMySql,
          cmd.mathProblem.mathAnswersIds,
        );
      }
      await manager.delete(MathProblemTypeOrmMySql, { id: cmd.mathProblem.id });
    });
  }
}
