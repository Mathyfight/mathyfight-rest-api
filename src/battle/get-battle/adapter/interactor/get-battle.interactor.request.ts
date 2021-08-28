import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetBattleErrors } from '../../domain/value-object/get-battle.errors';

export class GetBattleInteractorRequest {
  constructor(readonly battleId: Uuid, readonly userId: Uuid) {}

  static parse(battleId: string, userId: string): GetBattleInteractorRequest {
    const errors = new GetBattleErrors();
    const battleIdV = Uuid.parse(battleId, errors, DomainErrorsProp.battleId);
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (battleIdV === null || userIdV === null)
      throw new ValidationException(errors);

    return new GetBattleInteractorRequest(battleIdV, userIdV);
  }
}
