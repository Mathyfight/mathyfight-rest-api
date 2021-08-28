import { Avatar } from '../entity/avatar';
import { Battle } from '../entity/battle';
import { AbandonBattleErrors } from '../value-object/abandon-battle.errors';

export class AbandonBattleCommand {
  static battleNotFound = 'debe existir';
  static battleAlreadyFinished = 'no debe haber terminado';
  static avatarNotFound = 'debe tener un avatar';
  static battleNotFromAvatar = 'debe ser el avatar de la batalla';

  private constructor(readonly battleId: string) {}
  readonly abandonBattle = true;

  static new(
    battle: Battle | null,
    avatar: Avatar | null,
    errors: AbandonBattleErrors,
  ): AbandonBattleCommand | null {
    if (battle === null) {
      errors.battleId.push(this.battleNotFound);
      return null;
    }

    if (avatar === null) {
      errors.userId.push(this.avatarNotFound);
      return null;
    }

    const isAvatarFromBattle = battle.avatarId === avatar.id;
    if (!isAvatarFromBattle) errors.userId.push(this.battleNotFromAvatar);

    if (battle.finished) errors.battleId.push(this.battleAlreadyFinished);

    if (!isAvatarFromBattle || battle.finished) return null;

    return new AbandonBattleCommand(battle.id);
  }
}
