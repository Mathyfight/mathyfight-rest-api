import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { AvatarEquipment } from '../entity/avatar-equipment';
import { User } from '../entity/user';
import { EquipEquipmentErrors } from '../value-object/equip-equipment.errors';

export class EquipEquipmentCommand {
  constructor(
    readonly avatarEquipmentId: string | undefined,
    readonly equipmentType: EquipmentType,
    readonly avatarId: string,
  ) {}

  static readonly userDoesNotExist = 'debe existir';
  static readonly userDoesNotHaveAvatar = 'debe tener un avatar';
  static readonly equipmentDoesNotExist = 'debe existir';
  static readonly equipmentDoesNotBelongToAvatar =
    'el equipamiento no le pertenece al avatar del usuario';
  static readonly equipmentDoesNotMatchWithType =
    'el equipamiento debe ser del tipo de equipamiento seleccionado';

  static new(
    user: User | null,
    avatarEquipment: AvatarEquipment | undefined | null,
    equipmentType: EquipmentType,
    errors: EquipEquipmentErrors,
  ): EquipEquipmentCommand | null {
    if (avatarEquipment === null)
      errors.equipmentId.push(this.equipmentDoesNotExist);

    if (user === null) errors.userId.push(this.userDoesNotExist);

    if (user === null) return null;

    if (user.avatarId === null) errors.userId.push(this.userDoesNotHaveAvatar);

    if (avatarEquipment === null || user.avatarId === null) return null;

    if (
      avatarEquipment !== undefined &&
      avatarEquipment.avatarId !== user.avatarId
    ) {
      errors.errors.push(this.equipmentDoesNotBelongToAvatar);
      return null;
    }

    if (
      avatarEquipment !== undefined &&
      avatarEquipment.equipmentType !== equipmentType
    ) {
      errors.errors.push(this.equipmentDoesNotMatchWithType);
      return null;
    }

    return new EquipEquipmentCommand(
      avatarEquipment?.id,
      equipmentType,
      user.avatarId,
    );
  }
}
