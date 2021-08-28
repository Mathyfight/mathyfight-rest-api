import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AbandonBattleErrors } from '../../domain/value-object/abandon-battle.errors';

export class AbandonBattleInteractorRequest {
  constructor(readonly userId: Uuid, readonly battleId: Uuid) {}

  static parse(
    userId: string,
    battleId: string,
  ): AbandonBattleInteractorRequest {
    const errors = new AbandonBattleErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const battleIdV = Uuid.parse(battleId, errors, DomainErrorsProp.battleId);
    if (userIdV === null || battleIdV === null)
      throw new ValidationException(errors);
    return new AbandonBattleInteractorRequest(userIdV, battleIdV);
  }
}
