import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AdminDeleteMathTopicErrors } from '../../domain/value-object/admin-delete-math-topic.errors';

export class AdminDeleteMathTopicInteractorRequest {
  constructor(readonly userId: Uuid, readonly mathTopicId: Uuid) {}

  static parse(
    userId: string,
    mathTopicId: string,
  ): AdminDeleteMathTopicInteractorRequest {
    const errors = new AdminDeleteMathTopicErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const mathTopicIdV = Uuid.parse(
      mathTopicId,
      errors,
      DomainErrorsProp.topicId,
    );

    if (userIdV === null || mathTopicIdV === null)
      throw new ValidationException(errors);

    return new AdminDeleteMathTopicInteractorRequest(userIdV, mathTopicIdV);
  }
}
