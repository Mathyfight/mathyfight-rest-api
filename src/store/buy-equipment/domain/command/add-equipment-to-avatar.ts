import * as uuid from 'uuid';

export class AddEquipmentToAvatar {
  readonly id: string;
  readonly level: number;
  readonly equipped: boolean;

  constructor(readonly equipmentId: string, readonly avatarId: string) {
    this.id = uuid.v4();
    this.level = 1;
    this.equipped = false;
  }
}
