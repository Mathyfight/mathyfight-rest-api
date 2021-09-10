import { AdminUser } from 'src/admin/core/domain/entity/admin-user';
import { MathProblem } from '../entity/math-problem';
import { AdminGetMathProblemErrors } from '../value-object/admin-get-math-problem.errors';

export class AdminGetMathProblemCommand {
  constructor(readonly mathProblem: MathProblem) {}

  static readonly notExist = 'debe existir';
  static readonly notAdmin = 'debe ser administrador';

  static new(
    user: AdminUser | null,
    mathProblem: MathProblem | null,
    errors: AdminGetMathProblemErrors,
  ): AdminGetMathProblemCommand | null {
    if (user === null) {
      errors.userId.push(this.notExist);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.notAdmin);
      return null;
    }

    if (mathProblem === null) {
      errors.mathProblemId.push(this.notExist);
      return null;
    }

    return new AdminGetMathProblemCommand(mathProblem);
  }
}
