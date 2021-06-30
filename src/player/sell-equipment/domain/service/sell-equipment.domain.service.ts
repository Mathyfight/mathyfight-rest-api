import { GivePlayerGold } from '../command/give-player-gold';
import { RemoveAvatarEquipment } from '../command/remove-avatar-equipment';
import { SellEquipmentCommand } from '../command/sell-equipment.command';
import { AvatarEquipment } from '../entity/avatar-equipment';
import { SellEquipmentErrors } from '../value-object/sell-equipment.errors';

export class SellEquipmentDomainService {
  doesNotExist = 'debe existir';

  invoke(
    avatarEquipment: AvatarEquipment | null,
    errors: SellEquipmentErrors,
  ): SellEquipmentCommand | null {
    if (avatarEquipment === null) {
      errors.avatarEquipmentId.push(this.doesNotExist);
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
