import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AdminGetMathProblemsByTopicErrors } from '../../domain/value-object/admin-get-math-problems-by-topic.errors';

export class AdminGetMathProblemsByTopicInteractorRequest {
  constructor(readonly userId: Uuid, readonly mathTopicId: Uuid) {}

  static parse(
    userId: string,
    mathTopicId: string,
  ): AdminGetMathProblemsByTopicInteractorRequest {
    const errors = new AdminGetMathProblemsByTopicErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const mathTopicIdV = Uuid.parse(
      mathTopicId,
      errors,
      DomainErrorsProp.mathTopicId,
    );

    if (userIdV === null || mathTopicIdV === null)
      throw new ValidationException(errors);

    return new AdminGetMathProblemsByTopicInteractorRequest(
      userIdV,
      mathTopicIdV,
    );
  }
}
