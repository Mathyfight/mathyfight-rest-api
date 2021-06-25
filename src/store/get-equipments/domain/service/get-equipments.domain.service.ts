import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsOld } from 'src/shared/domain/value-object/util/domain-errors-old';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';

export class GetEquipmentsDomainService {
  readonly userHasToHaveAnAvatar = 'debe tener un avatar';

  validateExistingAvatar(avatarId: Uuid | null, errors: DomainErrorsOld): void {
    const existingAvatar = avatarId !== null;
    if (!existingAvatar)
      errors.add(this.userHasToHaveAnAvatar, DomainErrorsProp.userId);
  }
}
