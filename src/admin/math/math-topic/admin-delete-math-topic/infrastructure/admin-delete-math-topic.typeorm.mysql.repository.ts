import { InjectRepository } from '@nestjs/typeorm';
import { MathAnswerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-answer.typeorm.mysql';
import { MathProblemTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-problem.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic-level.typeorm.mysql';
import { MathTopicTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player-unlocked-math-topic-level.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { AdminDeleteMathTopicRepository } from '../adapter/interface/admin-delete-math-topic.repository';
import { AdminDeleteMathTopicCommand } from '../domain/command/admin-delete-math-topic.command';
import {
  Battle,
  MathTopic,
  MathTopicLevel,
  PlayerUnlockedMathTopicLevel,
} from '../domain/entity/math-topic';
import { User } from '../domain/entity/user';

export class AdminDeleteMathTopicTypeOrmMySqlRepository
  implements AdminDeleteMathTopicRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(MathTopicTypeOrmMySql)
    private readonly mathTopicRepository: Repository<MathTopicTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.id, ormUser.isAdmin);
  }

  async getMathTopicById(mathTopicId: string): Promise<MathTopic | null> {
    const ormMathTopic = await this.mathTopicRepository.findOne(mathTopicId, {
      relations: [
        'mathTopicLevels',
        'mathTopicLevels.playerUnlockedMathTopicLevels',
        'mathTopicLevels.playerUnlockedMathTopicLevels.battles',
        'mathProblems',
        'mathProblems.mathAnswers',
      ],
    });
    if (ormMathTopic === undefined) return null;
    return new MathTopic(
      ormMathTopic.id,
      ormMathTopic.imageUrl,
      ormMathTopic.mathProblems.map((p) => p.id),
      ormMathTopic.mathProblems.flatMap((p) => p.mathAnswers.map((a) => a.id)),
      ormMathTopic.mathTopicLevels.map(
        (l) =>
          new MathTopicLevel(
            l.id,
            l.playerUnlockedMathTopicLevels.map(
              (u) =>
                new PlayerUnlockedMathTopicLevel(
                  u.id,
                  u.battles.map((b) => new Battle(b.id)),
                ),
            ),
          ),
      ),
    );
  }

  async deleteMathTopic(cmd: AdminDeleteMathTopicCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      const pumtlIds = cmd.mathTopic.mathTopicLevels.flatMap((l) =>
        l.playerUnlockedLevels.flatMap((u) => u.id),
      );
      const mtlIds = cmd.mathTopic.mathTopicLevels.flatMap((l) => l.id);

      if (pumtlIds.length > 0)
        await manager.delete(
          PlayerUnlockedMathTopicLevelTypeOrmMySql,
          pumtlIds,
        );
      if (mtlIds.length > 0)
        await manager.delete(MathTopicLevelTypeOrmMySql, mtlIds);
      if (cmd.mathTopic.mathAnswersIds.length > 0)
        await manager.delete(
          MathAnswerTypeOrmMySql,
          cmd.mathTopic.mathAnswersIds,
        );
      if (cmd.mathTopic.mathProblemIds.length > 0)
        await manager.delete(
          MathProblemTypeOrmMySql,
          cmd.mathTopic.mathProblemIds,
        );

      await manager.delete(MathTopicTypeOrmMySql, cmd.mathTopic.id);
    });
  }
}
