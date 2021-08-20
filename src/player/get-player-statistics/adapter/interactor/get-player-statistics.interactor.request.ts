import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetPlayerStatisticsErrors } from '../../domain/value-object/get-player-statistics.errors';

export class GetPlayerStatisticsInteractorRequest {
  constructor(readonly userId: Uuid) {}

  static parse(userId: string): GetPlayerStatisticsInteractorRequest {
    const errors = new GetPlayerStatisticsErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (userIdV === null) throw new ValidationException(errors);

    return new GetPlayerStatisticsInteractorRequest(userIdV);
  }
}
