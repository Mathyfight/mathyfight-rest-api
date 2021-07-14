import { AvatarEquipment } from '../entity/avatar-equipment';
import { SellEquipmentErrors } from '../value-object/sell-equipment.errors';
import { GivePlayerGold } from './give-player-gold';
import { RemoveAvatarEquipment } from './remove-avatar-equipment';

export class SellEquipmentCommand {
  static doesNotExist = 'debe existir';
  static userDoesNotOwnEquipment = 'debe poseer el equipamiento';

  private constructor(
    readonly givePlayerGold: GivePlayerGold,
    readonly removeAvatarEquipment: RemoveAvatarEquipment,
  ) {}

  static new(
    userId: string,
    avatarEquipment: AvatarEquipment | null,
    errors: SellEquipmentErrors,
  ): SellEquipmentCommand | null {
    if (avatarEquipment === null) {
      errors.avatarEquipmentId.push(this.doesNotExist);
      return null;
    }

    if (avatarEquipment.userId !== userId) {
      errors.userId.push(this.userDoesNotOwnEquipment);
      return null;
    }

    return new SellEquipmentCommand(
      new GivePlayerGold(
        avatarEquipment.playerId,
        avatarEquipment.sellStats.sellPrice,
      ),
      new RemoveAvatarEquipment(avatarEquipment.id),
    );
  }
}
