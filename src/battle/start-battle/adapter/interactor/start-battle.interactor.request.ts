import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { StartBattleErrors } from '../../domain/value-object/start-battle.errors';

export class StartBattleInteractorRequest {
  constructor(readonly userId: Uuid, readonly levelId: Uuid) {}

  static parse(userId: string, levelId: string): StartBattleInteractorRequest {
    const errors = new StartBattleErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const levelIdV = Uuid.parse(levelId, errors, DomainErrorsProp.levelId);

    if (userIdV === null || levelIdV === null)
      throw new ValidationException(errors);

    return new StartBattleInteractorRequest(userIdV, levelIdV);
  }
}
