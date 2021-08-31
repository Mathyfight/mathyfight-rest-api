import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AdminGetMathAreasErrors } from '../../domain/value-object/admin-get-math-areas.errors';

export class AdminGetMathAreasInteractorRequest {
  constructor(readonly userId: Uuid) {}

  static parse(userId: string): AdminGetMathAreasInteractorRequest {
    const errors = new AdminGetMathAreasErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (userIdV === null) throw new ValidationException(errors);

    return new AdminGetMathAreasInteractorRequest(userIdV);
  }
}
