import { User } from '../entity/user';
import { AdminGetMathProblemsByTopicErrors } from '../value-object/admin-get-math-problems-by-topic.errors';

export class AdminGetMathProblemsByTopicCommand {
  static readonly notExist = 'debe existir';
  static readonly notAdmin = 'debe ser administrador';

  static new(
    user: User | null,
    errors: AdminGetMathProblemsByTopicErrors,
  ): AdminGetMathProblemsByTopicCommand | null {
    if (user === null) {
      errors.userId.push(this.notExist);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.notAdmin);
      return null;
    }

    return new AdminGetMathProblemsByTopicCommand();
  }
}
