import { Race } from '../entity/race';
import { User } from '../entity/user';
import { UpdatePlayerAvatarErrors } from '../value-object/update-player-avatar.errors';

export class UpdatePlayerAvatarCommand {
  constructor(
    readonly avatarId: string,
    readonly color: string | undefined,
    readonly raceId: string | undefined,
  ) {}

  static readonly userNotFound = 'debe existir';
  static readonly userDoesNotHaveAvatar = 'debe tener un avatar';
  static readonly raceNotFound = 'debe existir';

  static new(
    user: User | null,
    race: Race | null | undefined,
    color: string | undefined,
    errors: UpdatePlayerAvatarErrors,
  ): UpdatePlayerAvatarCommand | null {
    if (race === null) {
      errors.raceId.push(this.raceNotFound);
    }

    if (user === null) {
      errors.userId.push(this.userNotFound);
      return null;
    }

    if (user.avatar === null) {
      errors.userId.push(this.userDoesNotHaveAvatar);
      return null;
    }

    if (race === null) return null;

    return new UpdatePlayerAvatarCommand(user.avatar.id, color, race?.id);
  }
}
