import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { TryAttackErrors } from '../../domain/value-object/try-attack.errors';

export class TryAttackInteractorRequest {
  constructor(
    readonly userId: Uuid,
    readonly battleId: Uuid,
    readonly answerId: Uuid,
  ) {}

  static parse(
    userId: string,
    battleId: string,
    answerId: string,
  ): TryAttackInteractorRequest {
    const errors = new TryAttackErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const battleIdV = Uuid.parse(battleId, errors, DomainErrorsProp.battleId);
    const answerIdV = Uuid.parse(answerId, errors, DomainErrorsProp.answerId);

    if (userIdV === null || battleIdV === null || answerIdV === null)
      throw new ValidationException(errors);

    return new TryAttackInteractorRequest(userIdV, battleIdV, answerIdV);
  }
}
