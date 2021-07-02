import { RemovePlayerGold } from '../command/remove-player-gold';
import { UpgradeEquipmentLevel } from '../command/upgrade-equipment-level';
import { UpgradeEquipmentCommand } from '../command/upgrade-equipment.command';
import { AvatarEquipment } from '../entity/avatar-equipment';
import { UpgradeEquipmentErrors } from '../value-object/upgrade-equipment.errors';

export class UpgradeEquipmentDomainService {
  doesNotExist = 'debe existir';
  doesNotHaveEnoughGold = (requiredGold: number): string =>
    `se necesita ${requiredGold} de oro más`;
  reachedMaximumLevel = 'llegó al nivel máximo';

  invoke(
    avatarEquipment: AvatarEquipment | null,
    errors: UpgradeEquipmentErrors,
  ): UpgradeEquipmentCommand | null {
    if (avatarEquipment === null) {
      errors.avatarEquipmentId.push(this.doesNotExist);
      return null;
    }

    if (avatarEquipment.reachedMaximumLevel) {
      errors.avatarEquipmentId.push(this.reachedMaximumLevel);
      return null;
    }

    if (!avatarEquipment.canBuyUpgrade) {
      errors.errors.push(
        this.doesNotHaveEnoughGold(avatarEquipment.goldDifferenceForUpgrade),
      );
      return null;
    }

    return new UpgradeEquipmentCommand(
      new UpgradeEquipmentLevel(avatarEquipment.id),
      new RemovePlayerGold(
        avatarEquipment.player.id,
        avatarEquipment.upgradePrice,
      ),
    );
  }
}
