import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AdminGetMathTopicErrors } from '../../domain/value-object/admin-get-math-topic.errors';

export class AdminGetMathTopicInteractorRequest {
  constructor(readonly userId: Uuid, readonly mathTopicId: Uuid) {}

  static parse(
    userId: string,
    mathtopicId: string,
  ): AdminGetMathTopicInteractorRequest {
    const errors = new AdminGetMathTopicErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const mathTopicIdV = Uuid.parse(
      mathtopicId,
      errors,
      DomainErrorsProp.mathTopicId,
    );

    if (userIdV === null || mathTopicIdV === null)
      throw new ValidationException(errors);

    return new AdminGetMathTopicInteractorRequest(userIdV, mathTopicIdV);
  }
}
