import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetMathTopicsByAreaErrors } from '../../domain/value-object/get-math-topics-by-area.errors';

export class GetMathTopicsByAreaInteractorRequest {
  constructor(readonly mathAreaId: Uuid) {}

  static parse(mathAreaId: string): GetMathTopicsByAreaInteractorRequest {
    const errors = new GetMathTopicsByAreaErrors();
    const mathAreaIdV = Uuid.parse(mathAreaId, errors, DomainErrorsProp.areaId);

    if (mathAreaIdV === null) throw new ValidationException(errors);

    return new GetMathTopicsByAreaInteractorRequest(mathAreaIdV);
  }
}
