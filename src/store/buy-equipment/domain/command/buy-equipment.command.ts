import { AddEquipmentToAvatar } from './add-equipment-to-avatar';
import { DecreasePlayerGold } from './decrease-player-gold';

export class BuyEquipmentCommand {
  constructor(
    readonly decreasePlayerGold: DecreasePlayerGold,
    readonly addEquipmentToAvatar: AddEquipmentToAvatar,
  ) {}
}
