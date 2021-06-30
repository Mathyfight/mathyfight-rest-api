import { GivePlayerGold } from '../../domain/command/give-player-gold';
import { RemoveAvatarEquipment } from '../../domain/command/remove-avatar-equipment';
import { AvatarEquipment } from '../../domain/entity/avatar-equipment';

export abstract class SellEquipmentRepository {
  abstract getAvatarEquipmentById(
    avatarEquipmentId: string,
  ): Promise<AvatarEquipment | null>;
  abstract removeAvatarEquipment(command: RemoveAvatarEquipment): Promise<void>;
  abstract givePlayerGold(command: GivePlayerGold): Promise<void>;
}
