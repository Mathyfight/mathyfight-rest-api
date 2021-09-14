import { InjectRepository } from '@nestjs/typeorm';
import { DifficultyTypeOrmMySql } from 'src/database/typeorm/mysql/entity/difficulty.typeorm.mysql';
import { MathAnswerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-answer.typeorm.mysql';
import { MathProblemTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-problem.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { AdminEditMathProblemRepository } from '../adapter/interface/admin-edit-math-problem.repository';
import { PersistMathProblem } from '../domain/command/persist-math-problem';
import { Difficulty } from '../domain/entity/difficulty';
import { MathAnswer } from '../domain/entity/math-answer';
import { MathProblem } from '../domain/entity/math-problem';

export class AdminEditMathProblemTypeOrmMySqlRepository
  implements AdminEditMathProblemRepository
{
  constructor(
    @InjectRepository(MathProblemTypeOrmMySql)
    private readonly mathProblemRepository: Repository<MathProblemTypeOrmMySql>,
    @InjectRepository(DifficultyTypeOrmMySql)
    private readonly difficultyRepository: Repository<DifficultyTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async getMathProblem(mathProblemId: string): Promise<MathProblem | null> {
    const ormMathProblem = await this.mathProblemRepository.findOne(
      mathProblemId,
      { relations: ['mathAnswers'] },
    );
    if (ormMathProblem === undefined) return null;
    return new MathProblem(
      ormMathProblem.id,
      ormMathProblem.mathAnswers.map((a) => new MathAnswer(a.id)),
    );
  }

  async getDifficulty(difficultyId: string): Promise<Difficulty | null> {
    const ormDifficulty = await this.difficultyRepository.findOne(difficultyId);
    if (ormDifficulty === undefined) return null;
    return new Difficulty(difficultyId);
  }

  async persistMathProblem(cmd: PersistMathProblem): Promise<void> {
    const ormMathProblemUpdateFields: {
      description?: string;
      imageUrl?: string;
      difficulty?: { id: string };
    } = {};
    if (cmd.description !== undefined)
      ormMathProblemUpdateFields.description = cmd.description;
    if (cmd.imageUrl !== undefined)
      ormMathProblemUpdateFields.imageUrl = cmd.imageUrl;
    if (cmd.difficultyId !== undefined)
      ormMathProblemUpdateFields.difficulty = { id: cmd.difficultyId };

    const ormMathAnswersUpdateFields: {
      id: string;
      description?: string;
      isCorrect?: boolean;
    }[] = [];
    if (cmd.answers !== undefined) {
      cmd.answers.forEach((a, i) => {
        ormMathAnswersUpdateFields.push({ id: a.id });
        if (a.description !== undefined)
          ormMathAnswersUpdateFields[i].description = a.description;
        if (a.isCorrect !== undefined)
          ormMathAnswersUpdateFields[i].isCorrect = a.isCorrect;
      });
    }

    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      if (
        ormMathProblemUpdateFields.description !== undefined ||
        ormMathProblemUpdateFields.difficulty !== undefined ||
        ormMathProblemUpdateFields.imageUrl !== undefined
      ) {
        await manager.update(
          MathProblemTypeOrmMySql,
          { id: cmd.id },
          ormMathProblemUpdateFields,
        );
      }

      if (ormMathAnswersUpdateFields.length > 0) {
        ormMathAnswersUpdateFields.forEach(async (a) => {
          await manager.update(MathAnswerTypeOrmMySql, { id: a.id }, a);
        });
      }
    });
  }
}
