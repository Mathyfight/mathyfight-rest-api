import { UpgradeEquipmentCommand } from '../../domain/command/upgrade-equipment.command';
import { AvatarEquipment } from '../../domain/entity/avatar-equipment';

export abstract class UpgradeEquipmentRepository {
  abstract getAvatarEquipmentById(
    avatarEquipmentId: string,
  ): Promise<AvatarEquipment | null>;
  abstract upgradeEquipment(cmd: UpgradeEquipmentCommand): Promise<void>;
}
