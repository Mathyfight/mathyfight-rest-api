import { Uuid } from 'src/shared/domain/value-object/general/uuid';

export class AddEquipmentToAvatar {
  constructor(readonly equipmentId: string, readonly avatarId: string) {}

  readonly avatarEquipmentId: string = Uuid.newPrimitive();
  readonly level = 1;
  readonly equipped = false;
}
