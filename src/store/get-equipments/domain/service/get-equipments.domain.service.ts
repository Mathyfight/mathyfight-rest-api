import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors-prop';

export class GetEquipmentsDomainService {
  readonly userHasToHaveAnAvatar = 'debe tener un avatar';

  validateExistingAvatar(avatarId: Uuid | null, errors: DomainErrors): void {
    const existingAvatar = avatarId !== null;
    if (!existingAvatar)
      errors.add(this.userHasToHaveAnAvatar, DomainErrorsProp.userId);
  }
}
