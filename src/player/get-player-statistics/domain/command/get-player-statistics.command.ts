import { User } from '../entity/user';
import { GetPlayerStatisticsErrors } from '../value-object/get-player-statistics.errors';

export class GetPlayerStatisticsCommand {
  private constructor(readonly user: User) {}

  static readonly userNotFound = 'debe existir';

  static new(
    user: User | null,
    errors: GetPlayerStatisticsErrors,
  ): GetPlayerStatisticsCommand | null {
    if (user === null) {
      errors.userId.push(this.userNotFound);
      return null;
    }

    return new GetPlayerStatisticsCommand(user);
  }
}
