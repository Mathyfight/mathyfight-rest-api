import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetMathTopicErrors } from '../../domain/value-object/get-math-topic.errors';

export class GetMathTopicInteractorRequest {
  constructor(readonly mathTopicId: Uuid, readonly userId: Uuid) {}

  static parse(
    mathTopicId: string,
    userId: string,
  ): GetMathTopicInteractorRequest {
    const errors = new GetMathTopicErrors();
    const mathTopicIdV = Uuid.parse(
      mathTopicId,
      errors,
      DomainErrorsProp.topicId,
    );
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (mathTopicIdV === null || userIdV === null)
      throw new ValidationException(errors);

    return new GetMathTopicInteractorRequest(mathTopicIdV, userIdV);
  }
}
