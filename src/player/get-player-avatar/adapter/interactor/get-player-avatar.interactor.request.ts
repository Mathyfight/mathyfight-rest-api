import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetPlayerAvatarErrors } from '../../domain/value-object/get-player-avatar.errors';

export class GetPlayerAvatarInteractorRequest {
  constructor(readonly userId: Uuid) {}

  static new(userId: string): GetPlayerAvatarInteractorRequest {
    const errors = new GetPlayerAvatarErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (userIdV === null) throw new ValidationException(errors);

    return new GetPlayerAvatarInteractorRequest(userIdV);
  }
}
