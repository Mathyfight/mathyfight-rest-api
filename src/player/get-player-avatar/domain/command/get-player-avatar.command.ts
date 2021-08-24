import { Avatar } from '../entity/avatar';
import { User } from '../entity/user';
import { GetPlayerAvatarErrors } from '../value-object/get-player-avatar.errors';

export class GetPlayerAvatarCommand {
  static readonly userDoesNotExist = 'debe existir';
  static readonly userDoesNotHaveAvatar = 'debe tener avatar';

  private constructor(readonly avatar: Avatar) {}

  static new(
    user: User | null,
    errors: GetPlayerAvatarErrors,
  ): GetPlayerAvatarCommand | null {
    if (user === null) {
      errors.userId.push(this.userDoesNotExist);
      return null;
    }

    if (user.avatar === null) {
      errors.userId.push(this.userDoesNotHaveAvatar);
      return null;
    }

    return new GetPlayerAvatarCommand(user.avatar);
  }
}
