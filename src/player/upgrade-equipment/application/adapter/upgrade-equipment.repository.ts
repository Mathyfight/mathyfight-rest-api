import { RemovePlayerGold } from '../../domain/command/remove-player-gold';
import { UpgradeEquipmentLevel } from '../../domain/command/upgrade-equipment-level';
import { AvatarEquipment } from '../../domain/entity/avatar-equipment';

export abstract class UpgradeEquipmentRepository {
  abstract getAvatarEquipmentById(
    avatarEquipmentId: string,
  ): Promise<AvatarEquipment | null>;
  abstract upgradeEquipmentLevel(command: UpgradeEquipmentLevel): Promise<void>;
  abstract removePlayerGold(command: RemovePlayerGold): Promise<void>;
}
