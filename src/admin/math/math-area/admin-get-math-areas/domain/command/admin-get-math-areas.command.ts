import { User } from '../entity/user';
import { AdminGetMathAreasErrors } from '../value-object/admin-get-math-areas.errors';

export class AdminGetMathAreasCommand {
  static readonly userNotFound = 'debe existir';
  static readonly userNotAdmin = 'debe ser administrador';

  static new(
    user: User | null,
    errors: AdminGetMathAreasErrors,
  ): AdminGetMathAreasCommand | null {
    if (user === null) {
      errors.userId.push(this.userNotFound);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.userNotAdmin);
      return null;
    }

    return new AdminGetMathAreasCommand();
  }
}
