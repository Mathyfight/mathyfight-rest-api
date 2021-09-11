import { InjectRepository } from '@nestjs/typeorm';
import { MathProblemTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-problem.typeorm.mysql';
import { Repository } from 'typeorm';
import { AdminGetMathProblemRepository } from '../adapter/interface/admin-get-math-problem.repository';
import { MathAnswer } from '../domain/entity/math-answer';
import { MathProblem } from '../domain/entity/math-problem';

export class AdminGetMathProblemTypeOrmMySqlRepository
  implements AdminGetMathProblemRepository
{
  constructor(
    @InjectRepository(MathProblemTypeOrmMySql)
    private readonly mathProblemRepository: Repository<MathProblemTypeOrmMySql>,
  ) {}

  async getMathProblem(mathProblemId: string): Promise<MathProblem | null> {
    const ormMathProblem = await this.mathProblemRepository.findOne(
      mathProblemId,
      { relations: ['difficulty', 'mathAnswers'] },
    );
    if (ormMathProblem === undefined) return null;
    return new MathProblem(
      ormMathProblem.id,
      ormMathProblem.description,
      ormMathProblem.difficulty.id,
      ormMathProblem.difficulty.name,
      ormMathProblem.imageUrl,
      ormMathProblem.mathAnswers.map(
        (a) => new MathAnswer(a.id, a.description, a.isCorrect),
      ),
    );
  }
}
