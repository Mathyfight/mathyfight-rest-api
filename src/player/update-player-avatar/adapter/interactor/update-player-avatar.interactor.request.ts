import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { HexColor } from '../../domain/value-object/hex-color';
import { UpdatePlayerAvatarErrors } from '../../domain/value-object/update-player-avatar.errors';

export class UpdatePlayerAvatarInteractorRequest {
  constructor(
    readonly userId: Uuid,
    readonly raceId: Uuid | undefined,
    readonly color: HexColor | undefined,
  ) {}

  static readonly colorAndRaceNull = 'la raza o el color deben tener un valor';

  static parse(
    userId: string,
    raceId: string | null,
    color: string | null,
  ): UpdatePlayerAvatarInteractorRequest {
    const errors = new UpdatePlayerAvatarErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    const raceIdV =
      raceId === null
        ? undefined
        : Uuid.parse(raceId, errors, DomainErrorsProp.raceId);
    const colorV =
      color === null
        ? undefined
        : HexColor.parse(color, errors, DomainErrorsProp.color);

    if (raceIdV === undefined && colorV === undefined)
      errors.errors.push(this.colorAndRaceNull);

    if (
      userIdV === null ||
      raceIdV === null ||
      colorV === null ||
      (raceIdV === undefined && colorV === undefined)
    )
      throw new ValidationException(errors);

    return new UpdatePlayerAvatarInteractorRequest(userIdV, raceIdV, colorV);
  }
}
