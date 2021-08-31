import { InjectRepository } from '@nestjs/typeorm';
import { BattleMathProblemTypeOrmMySql } from 'src/database/typeorm/mysql/entity/battle-math-problem.typeorm.mysql';
import { BattleTypeOrmMySql } from 'src/database/typeorm/mysql/entity/battle.typeorm.mysql';
import { MathProblemTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-problem.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { StartAttackRepository } from '../adapter/interface/start-attack.repository';
import { SaveMathProblemBattle } from '../domain/command/save-math-problem-battle';
import { Battle } from '../domain/entity/battle';
import { MathProblem, MathProblemAnswer } from '../domain/entity/math-problem';

export class StartAttackTypeOrmMySqlRepository
  implements StartAttackRepository
{
  constructor(
    @InjectRepository(BattleTypeOrmMySql)
    private readonly battleRepository: Repository<BattleTypeOrmMySql>,
    @InjectRepository(MathProblemTypeOrmMySql)
    private readonly mathProblemRepository: Repository<MathProblemTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async saveMathProblemAndBattle(cmd: SaveMathProblemBattle): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.insert(BattleMathProblemTypeOrmMySql, {
        id: cmd.id,
        createdAt: cmd.createdAt,
        solved: cmd.solved,
        battle: { id: cmd.battleId },
        mathProblem: { id: cmd.mathProblemId },
      });
    });
  }

  async getBattleById(battleId: string): Promise<Battle | null> {
    const ormBattle = await this.battleRepository.findOne(battleId, {
      relations: [
        'playerUnlockedMathTopicLevel',
        'playerUnlockedMathTopicLevel.mathTopicLevel',
        'playerUnlockedMathTopicLevel.mathTopicLevel.mathTopic',
        'playerUnlockedMathTopicLevel.player',
        'playerUnlockedMathTopicLevel.player.user',
        'battleMathProblems',
        'battleMathProblems.mathProblem',
      ],
    });
    if (ormBattle === undefined) return null;
    return new Battle(
      ormBattle.id,
      ormBattle.playerUnlockedMathTopicLevel.player.user.id,
      ormBattle.battleMathProblems.map((a) => a.mathProblem.id),
      ormBattle.avatarHealth,
      ormBattle.avatarDefense,
      ormBattle.enemyHealth,
      ormBattle.enemyDefense,
      ormBattle.abandoned,
      ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.mathTopic.id,
    );
  }

  async getMathProblemsByDifficultyIdAndMathTopicId(
    difficultyId: string,
    mathTopicId: string,
  ): Promise<MathProblem[]> {
    const ormMathProblems = await this.mathProblemRepository.find({
      where: {
        difficulty: { id: difficultyId },
        mathTopic: { id: mathTopicId },
      },
      relations: ['mathAnswers'],
    });
    return ormMathProblems.map(
      (p) =>
        new MathProblem(
          p.id,
          difficultyId,
          p.description,
          p.imageUrl,
          p.mathAnswers.map((a) => new MathProblemAnswer(a.id, a.description)),
        ),
    );
  }
}
