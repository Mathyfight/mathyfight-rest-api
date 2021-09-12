import { InjectRepository } from '@nestjs/typeorm';
import { DifficultyTypeOrmMySql } from 'src/database/typeorm/mysql/entity/difficulty.typeorm.mysql';
import { MathAnswerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-answer.typeorm.mysql';
import { MathProblemTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-problem.typeorm.mysql';
import { MathTopicTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { AdminAddMathProblemRepository } from '../adapter/interface/admin-add-math-problem.repository';
import { PersistMathProblem } from '../domain/command/persist-math-problem';
import { Difficulty } from '../domain/entity/difficulty';
import { MathTopic } from '../domain/entity/math-topic';

export class AdminAddMathProblemTypeOrmMySqlRepository
  implements AdminAddMathProblemRepository
{
  constructor(
    @InjectRepository(DifficultyTypeOrmMySql)
    private readonly difficultyRepository: Repository<DifficultyTypeOrmMySql>,
    @InjectRepository(MathTopicTypeOrmMySql)
    private readonly mathtopicRepository: Repository<MathTopicTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async getDifficulty(difficultyId: string): Promise<Difficulty | null> {
    const ormDifficulty = await this.difficultyRepository.findOne(difficultyId);
    if (ormDifficulty === undefined) return null;
    return new Difficulty(ormDifficulty.id);
  }

  async getMathTopic(mathTopicId: string): Promise<MathTopic | null> {
    const ormMathTopic = await this.mathtopicRepository.findOne(mathTopicId);
    if (ormMathTopic === undefined) return null;
    return new MathTopic(ormMathTopic.id);
  }

  async persistMathProblem(cmd: PersistMathProblem): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.insert(MathProblemTypeOrmMySql, {
        id: cmd.id,
        description: cmd.description,
        imageUrl: cmd.imageUrl,
        mathTopic: { id: cmd.mathTopicId },
        difficulty: { id: cmd.difficultyId },
      });
      await manager.insert(
        MathAnswerTypeOrmMySql,
        cmd.answers.map((a) => ({
          id: a.id,
          description: a.description,
          isCorrect: a.isCorrect,
          mathProblem: { id: cmd.id },
        })),
      );
    });
  }
}
