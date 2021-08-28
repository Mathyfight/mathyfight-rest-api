import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { StartAttackErrors } from '../../domain/value-object/start-attack.errors';

export class StartAttackInteractorRequest {
  constructor(
    readonly difficultyId: Uuid,
    readonly userId: Uuid,
    readonly battleId: Uuid,
  ) {}

  static parse(
    difficultyId: string,
    userId: string,
    battleId: string,
  ): StartAttackInteractorRequest {
    const errors = new StartAttackErrors();
    const difficultyIdV = Uuid.parse(
      difficultyId,
      errors,
      DomainErrorsProp.difficultyLevelId,
    );
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const battleIdV = Uuid.parse(battleId, errors, DomainErrorsProp.battleId);

    if (userIdV === null || difficultyIdV === null || battleIdV === null)
      throw new ValidationException(errors);

    return new StartAttackInteractorRequest(difficultyIdV, userIdV, battleIdV);
  }
}
