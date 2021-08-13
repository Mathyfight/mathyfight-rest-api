import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetGeneralInfoErrors } from '../../domain/value-object/get-general-info.errors';

export class GetGeneralInfoInteractorRequest {
  constructor(readonly userId: Uuid) {}

  static parse(userId: string): GetGeneralInfoInteractorRequest {
    const errors = new GetGeneralInfoErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    if (userIdV === null) throw new ValidationException(errors);

    return new GetGeneralInfoInteractorRequest(userIdV);
  }
}
