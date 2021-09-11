import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AdminDeleteMathProblemErrors } from '../../domain/value-object/admin-delete-math-problem.errors';

export class AdminDeleteMathProblemInteractorRequest {
  constructor(readonly userId: Uuid, readonly mathProblemId: Uuid) {}

  static parse(
    userId: string,
    mathProblemId: string,
  ): AdminDeleteMathProblemInteractorRequest {
    const errors = new AdminDeleteMathProblemErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const mathProblemIdV = Uuid.parse(
      mathProblemId,
      errors,
      DomainErrorsProp.mathProblemId,
    );

    if (userIdV === null || mathProblemIdV === null)
      throw new ValidationException(errors);

    return new AdminDeleteMathProblemInteractorRequest(userIdV, mathProblemIdV);
  }
}
