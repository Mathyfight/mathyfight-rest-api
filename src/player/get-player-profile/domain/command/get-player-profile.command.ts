import { User } from '../entity/user';
import { GetPlayerProfileErrors } from '../value-object/get-player-profile.errors';

export class GetPlayerProfileCommand {
  private constructor(readonly user: User) {}

  static readonly userNotFound = 'debe existir';

  static new(
    user: User | null,
    errors: GetPlayerProfileErrors,
  ): GetPlayerProfileCommand | null {
    if (user === null) {
      errors.userId.push(this.userNotFound);
      return null;
    }

    return new GetPlayerProfileCommand(user);
  }
}
