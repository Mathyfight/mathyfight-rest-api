import { GetEquipmentsCommand } from '../command/get-equipments.command';
import { GetEquipmentsErrors } from '../value-object/get-equipments.errors';

export class GetEquipmentsDomainService {
  readonly userHasToHaveAnAvatar = 'debe tener un avatar';

  invoke(
    avatarId: string | null,
    errors: GetEquipmentsErrors,
  ): GetEquipmentsCommand | null {
    if (avatarId === null) {
      errors.userId.push(this.userHasToHaveAnAvatar);
      return null;
    }
    return new GetEquipmentsCommand(avatarId);
  }
}
