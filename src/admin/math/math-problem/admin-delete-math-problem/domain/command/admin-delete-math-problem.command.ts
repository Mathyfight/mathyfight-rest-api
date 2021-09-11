import { AdminUser } from 'src/admin/core/domain/entity/admin-user';
import { MathProblem } from '../entity/math-problem';
import { AdminDeleteMathProblemErrors } from '../value-object/admin-delete-math-problem.errors';

export class AdminDeleteMathProblemCommand {
  constructor(readonly mathProblem: MathProblem) {}

  static readonly notExist = 'debe existir';
  static readonly notAdmin = 'debe ser administrador';
  static readonly battlesWithMathProblemExist =
    'no debe tener batallas asociadas';

  static new(
    user: AdminUser | null,
    mathProblem: MathProblem | null,
    errors: AdminDeleteMathProblemErrors,
  ): AdminDeleteMathProblemCommand | null {
    if (user === null) errors.userId.push(this.notExist);

    if (mathProblem === null) errors.mathProblemId.push(this.notExist);

    if (user === null) return null;

    if (!user.isAdmin) errors.userId.push(this.notAdmin);

    if (mathProblem === null) return null;

    if (!mathProblem.canBeDeleted)
      errors.mathProblemId.push(this.battlesWithMathProblemExist);

    if (errors.mathProblemId.length > 0 || errors.userId.length > 0)
      return null;

    return new AdminDeleteMathProblemCommand(mathProblem);
  }
}
