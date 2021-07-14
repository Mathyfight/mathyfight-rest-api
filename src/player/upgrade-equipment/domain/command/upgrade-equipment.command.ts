import { AvatarEquipment } from '../entity/avatar-equipment';
import { UpgradeEquipmentErrors } from '../value-object/upgrade-equipment.errors';
import { RemovePlayerGold } from './remove-player-gold';
import { UpgradeEquipmentLevel } from './upgrade-equipment-level';

export class UpgradeEquipmentCommand {
  static doesNotExist = 'debe existir';
  static doesNotHaveEnoughGold = (requiredGold: number): string =>
    `se necesita ${requiredGold} de oro más`;
  static reachedMaximumLevel = 'llegó al nivel máximo';
  static userDoesNotOwnEquipment = 'debe poseer el equipamiento';

  private constructor(
    readonly upgradeEquipmentLevel: UpgradeEquipmentLevel,
    readonly removePlayerGold: RemovePlayerGold,
  ) {}

  static new(
    userId: string,
    avatarEquipment: AvatarEquipment | null,
    errors: UpgradeEquipmentErrors,
  ): UpgradeEquipmentCommand | null {
    if (avatarEquipment === null) {
      errors.avatarEquipmentId.push(this.doesNotExist);
      return null;
    }

    if (userId !== avatarEquipment.player.userId) {
      errors.userId.push(this.userDoesNotOwnEquipment);
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
