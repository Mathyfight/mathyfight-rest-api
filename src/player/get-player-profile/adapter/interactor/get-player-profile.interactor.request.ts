import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetPlayerProfileErrors } from '../../domain/value-object/get-player-profile.errors';

export class GetPlayerProfileInteractorRequest {
  constructor(readonly userId: Uuid) {}

  static parse(userId: string): GetPlayerProfileInteractorRequest {
    const errors = new GetPlayerProfileErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (userIdV === null) throw new ValidationException(errors);

    return new GetPlayerProfileInteractorRequest(userIdV);
  }
}
