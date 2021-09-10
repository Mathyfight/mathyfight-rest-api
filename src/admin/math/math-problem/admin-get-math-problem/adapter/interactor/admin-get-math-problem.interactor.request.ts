import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AdminGetMathProblemErrors } from '../../domain/value-object/admin-get-math-problem.errors';

export class AdminGetMathProblemInteractorRequest {
  constructor(readonly userId: Uuid, readonly mathProblemId: Uuid) {}

  static parse(
    userId: string,
    mathProblemId: string,
  ): AdminGetMathProblemInteractorRequest {
    const errors = new AdminGetMathProblemErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const mathProblemIdV = Uuid.parse(
      mathProblemId,
      errors,
      DomainErrorsProp.mathProblemId,
    );

    if (userIdV === null || mathProblemIdV === null)
      throw new ValidationException(errors);

    return new AdminGetMathProblemInteractorRequest(userIdV, mathProblemIdV);
  }
}
