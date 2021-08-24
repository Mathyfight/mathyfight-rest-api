import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';

export class AvatarEquipment {
  constructor(
    readonly id: string,
    readonly avatarId: string,
    readonly equipmentType: EquipmentType,
  ) {}
}
