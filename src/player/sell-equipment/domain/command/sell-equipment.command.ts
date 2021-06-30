import { GivePlayerGold } from './give-player-gold';
import { RemoveAvatarEquipment } from './remove-avatar-equipment';

export class SellEquipmentCommand {
  constructor(
    readonly givePlayerGold: GivePlayerGold,
    readonly removeAvatarEquipment: RemoveAvatarEquipment,
  ) {}
}
