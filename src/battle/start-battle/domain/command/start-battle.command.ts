import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { MathTopicLevel } from '../entity/math-topic-level';
import { User } from '../entity/user';
import { StartBattleErrors } from '../value-object/start-battle.errors';

export class StartBattleCommand {
  static mathTopicLevelDoesNotExist = 'debe existir';
  static userDoesNotExist = 'debe existir';
  static userDoesNotHaveAvatar = 'debe tener un avatar';
  static userHasNotUnlockedLevel = 'debe haber desbloqueado el nivel';

  private constructor(
    readonly enemyHealth: number,
    readonly enemyDefense: number,
    readonly avatarHealth: number,
    readonly avatarDefense: number,
    readonly unlockedMathTopicLevelId: string,
  ) {}

  readonly battleId: string = Uuid.newPrimitive();
  readonly abandoned = false;

  static new(
    user: User | null,
    mathTopicLevel: MathTopicLevel | null,
    errors: StartBattleErrors,
  ): StartBattleCommand | null {
    if (mathTopicLevel === null)
      errors.levelId.push(this.mathTopicLevelDoesNotExist);

    if (user === null) {
      errors.userId.push(this.userDoesNotExist);
      return null;
    }

    if (user.avatar === null) {
      errors.userId.push(this.userDoesNotHaveAvatar);
      return null;
    }

    if (mathTopicLevel === null) return null;

    const unlockedLevel = user.unlockedLevels.find(
      (ul) => ul.mathTopicLevelId === mathTopicLevel.id,
    );
    if (unlockedLevel === undefined) {
      errors.userId.push(this.userHasNotUnlockedLevel);
      return null;
    }

    return new StartBattleCommand(
      mathTopicLevel.enemyMaxHealth,
      mathTopicLevel.enemyDefense,
      user.avatar.maxHealth,
      user.avatar.defense,
      unlockedLevel.id,
    );
  }
}
