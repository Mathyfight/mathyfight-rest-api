import { BattleAvatar } from '../entity/battle-avatar';
import { Battle } from '../entity/battle';
import { MathAnswer } from '../entity/math-answer';
import { User } from '../entity/user';
import { TryAttackErrors } from '../value-object/try-attack.errors';
import { EnemyAttacksPlayer } from './enemy-attacks-player';
import { PlayerAttacksEnemy } from './player-attacks-enemy';
import { MathProblem } from '../entity/math-problem';

export class TryAttackCommand {
  readonly enemyAttacksPlayer: EnemyAttacksPlayer | undefined;
  readonly playerAttacksEnemy: PlayerAttacksEnemy | undefined;

  constructor(
    battle: Battle,
    mathProblem: MathProblem,
    playerAvatar: BattleAvatar,
    selectedMathAnswer: MathAnswer,
  ) {
    if (
      !mathProblem.isInsideAnswerTimeFrame ||
      mathProblem.correctAnswer.id !== selectedMathAnswer.id
    ) {
      this.enemyAttacksPlayer = new EnemyAttacksPlayer(
        mathProblem.battleMathProblemId,
        battle.id,
        playerAvatar,
        battle.enemy,
      );
    } else {
      this.playerAttacksEnemy = new PlayerAttacksEnemy(
        playerAvatar,
        battle,
        mathProblem,
      );
    }
  }

  static readonly userDoesNotExist = 'debe existir';
  static readonly battleDoesNotExist = 'debe existir';
  static readonly battleDoesNotHaveAProblem =
    'debe tener un problema para resolver';
  static readonly mathAnswerDoesNotExist = 'debe existir';
  static readonly userDoesNotHaveAvatar = 'debe tener un avatar';
  static readonly userDoesNotHaveBattleAvatar =
    'debe tener el avatar de la batalla';

  static new(
    battle: Battle | null,
    user: User | null,
    selectedMathAnswer: MathAnswer | null,
    errors: TryAttackErrors,
  ): TryAttackCommand | null {
    if (battle === null) {
      errors.battleId.push(this.battleDoesNotExist);
    }

    if (selectedMathAnswer === null) {
      errors.answerId.push(this.mathAnswerDoesNotExist);
    }

    if (user === null) {
      errors.userId.push(this.userDoesNotExist);
    }

    if (user === null) return null;

    if (user.avatar === null) {
      errors.userId.push(this.userDoesNotHaveAvatar);
    }

    if (user.avatar === null || battle === null) return null;

    if (battle.mathProblem === null) {
      errors.battleId.push(this.battleDoesNotHaveAProblem);
    }

    if (battle.avatar.id !== user.avatar.id) {
      errors.userId.push(this.userDoesNotHaveBattleAvatar);
    }

    if (selectedMathAnswer === null || battle.mathProblem === null) return null;

    return new TryAttackCommand(
      battle,
      battle.mathProblem,
      battle.avatar,
      selectedMathAnswer,
    );
  }
}
