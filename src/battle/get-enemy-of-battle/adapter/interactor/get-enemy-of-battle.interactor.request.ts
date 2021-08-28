import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetEnemyOfBattleErrors } from '../../domain/value-object/get-enemy-of-battle.errors';

export class GetEnemyOfBattleInteractorRequest {
  constructor(readonly battleId: Uuid, readonly userId: Uuid) {}

  static parse(
    battleId: string,
    userId: string,
  ): GetEnemyOfBattleInteractorRequest {
    const errors = new GetEnemyOfBattleErrors();
    console.log(battleId);
    const battleIdV = Uuid.parse(battleId, errors, DomainErrorsProp.battleId);
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (battleIdV === null || userIdV === null)
      throw new ValidationException(errors);

    return new GetEnemyOfBattleInteractorRequest(battleIdV, userIdV);
  }
}
