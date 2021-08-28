import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { TryAttackRepository } from '../adapter/interface/try-attack.repository';
import { BattleAvatar } from '../domain/entity/battle-avatar';
import { Battle } from '../domain/entity/battle';
import { MathAnswer } from '../domain/entity/math-answer';
import { Avatar, User } from '../domain/entity/user';
import { BattleTypeOrmMySql } from 'src/database/typeorm/mysql/entity/battle.typeorm.mysql';
import { Equipment } from '../domain/entity/equipment';
import { Enemy } from '../domain/entity/enemy';
import { MathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic-level.typeorm.mysql';
import { MathProblem } from '../domain/entity/math-problem';
import { MathAnswerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-answer.typeorm.mysql';
import { EnemyAttacksPlayer } from '../domain/command/enemy-attacks-player';
import { PlayerAttacksEnemy } from '../domain/command/player-attacks-enemy';
import { BattleMathProblemTypeOrmMySql } from 'src/database/typeorm/mysql/entity/battle-math-problem.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player-unlocked-math-topic-level.typeorm.mysql';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';

export class TryAttackTypeOrmMySqlRepository implements TryAttackRepository {
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(BattleTypeOrmMySql)
    private readonly battleRepository: Repository<BattleTypeOrmMySql>,
    @InjectRepository(MathTopicLevelTypeOrmMySql)
    private readonly mathTopicLevelRepository: Repository<MathTopicLevelTypeOrmMySql>,
    @InjectRepository(MathAnswerTypeOrmMySql)
    private readonly mathAnswerRepository: Repository<MathAnswerTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId, {
      relations: ['player', 'player.avatar'],
    });
    if (ormUser === undefined) return null;
    return new User(
      ormUser.player === null ? null : new Avatar(ormUser.player.avatar.id),
    );
  }

  async getBattleById(battleId: string): Promise<Battle | null> {
    const ormBattle = await this.battleRepository.findOne(battleId, {
      relations: [
        'battleMathProblems',
        'battleMathProblems.mathProblem',
        'battleMathProblems.mathProblem.difficulty',
        'battleMathProblems.mathProblem.mathAnswers',
        'playerUnlockedMathTopicLevel',
        'playerUnlockedMathTopicLevel.mathTopicLevel',
        'playerUnlockedMathTopicLevel.mathTopicLevel.level',
        'playerUnlockedMathTopicLevel.player',
        'playerUnlockedMathTopicLevel.player.avatar',
        'playerUnlockedMathTopicLevel.player.avatar.equipments',
        'playerUnlockedMathTopicLevel.player.avatar.equipments.equipment',
      ],
    });
    if (ormBattle === undefined) return null;
    const ormMathProblem: BattleMathProblemTypeOrmMySql | undefined =
      ormBattle.battleMathProblems
        .filter((p) => !p.solved)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
    const ormNextLevel = await this.mathTopicLevelRepository
      .createQueryBuilder('mtl')
      .innerJoin('mtl.level', 'l')
      .where('l.number = :levelNumber', {
        levelNumber:
          ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.level.number +
          1,
      })
      .getOne();
    return new Battle(
      ormBattle.id,
      new BattleAvatar(
        ormBattle.playerUnlockedMathTopicLevel.player.avatar.id,
        ormBattle.playerUnlockedMathTopicLevel.player.id,
        ormBattle.avatarDefense,
        ormBattle.avatarHealth,
        ormBattle.playerUnlockedMathTopicLevel.player.avatar.level,
        ormBattle.playerUnlockedMathTopicLevel.player.avatar.currentExperience,
        ormBattle.playerUnlockedMathTopicLevel.player.avatar.baseAttack,
        ormBattle.playerUnlockedMathTopicLevel.player.avatar.baseDefense,
        ormBattle.playerUnlockedMathTopicLevel.player.avatar.maxHealth,
        ormBattle.playerUnlockedMathTopicLevel.player.avatar.equipments
          .filter((e) => e.equipped)
          .map((e) => new Equipment(e.equipment.attack)),
      ),
      ormMathProblem === undefined
        ? null
        : new MathProblem(
            ormMathProblem.id,
            new MathAnswer(
              ormMathProblem.mathProblem.mathAnswers.find(
                (a) => a.isCorrect,
              )!.id,
            ),
            moment(ormMathProblem.createdAt),
            ormMathProblem.mathProblem.difficulty.damageMultiplier,
            ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.level.goldGained,
            ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.level.experienceGained,
          ),
      new Enemy(
        ormBattle.playerUnlockedMathTopicLevel.mathTopicLevel.level.enemyAttack,
        ormBattle.enemyDefense,
        ormBattle.enemyHealth,
      ),
      ormNextLevel === undefined ? null : ormNextLevel.id,
    );
  }

  async getMathAnswerById(mathAnswerId: string): Promise<MathAnswer | null> {
    const ormMathAnswer = await this.mathAnswerRepository.findOne(mathAnswerId);
    if (ormMathAnswer === undefined) return null;
    return new MathAnswer(ormMathAnswer.id);
  }

  async enemyAttacksPlayer(cmd: EnemyAttacksPlayer): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.update(
        BattleMathProblemTypeOrmMySql,
        cmd.battleMathProblemId,
        { solved: cmd.mathProblemSolved },
      );
      await manager.update(BattleTypeOrmMySql, cmd.battleId, {
        avatarDefense: cmd.updatedPlayerDefense,
        avatarHealth: cmd.updatedPlayerHealth,
      });
    });
  }

  async playerAttacksEnemy(cmd: PlayerAttacksEnemy): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.update(
        BattleMathProblemTypeOrmMySql,
        cmd.battleMathProblemId,
        { solved: cmd.mathProblemSolved },
      );
      await manager.update(BattleTypeOrmMySql, cmd.battleId, {
        enemyDefense: cmd.updatedEnemyDefense,
        enemyHealth: cmd.updatedEnemyHealth,
      });
      await manager.increment(
        PlayerTypeOrmMySql,
        { id: cmd.playerId },
        'gold',
        cmd.earnedGold,
      );
      if (cmd.unlockMathTopicLevelId !== null) {
        await manager.insert(PlayerUnlockedMathTopicLevelTypeOrmMySql, {
          id: cmd.playerUnlockedMathTopicLevelid,
          mathTopicLevel: { id: cmd.unlockMathTopicLevelId },
          player: { id: cmd.playerId },
        });
      }
      await manager.update(AvatarTypeOrmMySql, cmd.avatarId, {
        currentExperience: cmd.updatedPlayerExperience,
        level: cmd.updatedPlayerLevel,
        baseAttack: cmd.updatedPlayerBaseAttack,
        baseDefense: cmd.updatedPlayerBaseDefense,
        maxHealth: cmd.updatedPlayerMaxHealth,
      });
    });
  }
}
