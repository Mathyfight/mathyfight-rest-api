import { Battle } from '../entity/battle';
import { User } from '../entity/user';
import { GetBattleErrors } from '../value-object/get-battle.errors';

export class GetBattleCommand {
  static readonly battleDoesNotExist = 'debe existir';
  static readonly userDoesNotExist = 'debe existir';
  static readonly userDoesNotHaveAvatar = 'debe tener avatar';
  static readonly battleAvatarIsNotUserAvatar =
    'no tiene el avatar de la batalla';

  constructor(private readonly battle: Battle) {}

  readonly playerHealth = this.battle.avatar.currentHealth;
  readonly playerDefense = this.battle.avatar.currentDefense;
  readonly enemyHealth = this.battle.enemyCurrentHealth;
  readonly enemyDefense = this.battle.enemyCurrentDefense;
  readonly playerWon =
    this.enemyHealth === 0 && this.enemyDefense === 0
      ? true
      : this.playerHealth === 0 && this.playerDefense === 0
      ? false
      : null;
  readonly nextLevelId = this.playerWon ? this.battle.nextLevelId : null;
  readonly levelUp =
    this.playerWon &&
    this.battle.avatar.level > 1 &&
    this.battle.avatar.currentExperience - this.battle.experienceToGain < 0
      ? { health: 3, attack: 1, defense: 1 }
      : null;

  static new(
    battle: Battle | null,
    user: User | null,
    errors: GetBattleErrors,
  ): GetBattleCommand | null {
    if (user === null) errors.userId.push(this.userDoesNotExist);

    if (battle === null) errors.battleId.push(this.battleDoesNotExist);

    if (user === null) return null;

    if (user.avatarId === null) errors.userId.push(this.userDoesNotHaveAvatar);

    if (battle === null) return null;

    if (battle.avatar.id !== user.avatarId) {
      errors.userId.push(this.battleAvatarIsNotUserAvatar);
      return null;
    }

    return new GetBattleCommand(battle);
  }
}
