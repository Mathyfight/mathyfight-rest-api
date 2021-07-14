import { SellEquipmentCommand } from '../../domain/command/sell-equipment.command';
import { AvatarEquipment } from '../../domain/entity/avatar-equipment';

export abstract class SellEquipmentRepository {
  abstract getAvatarEquipmentById(
    avatarEquipmentId: string,
  ): Promise<AvatarEquipment | null>;
  abstract sellEquipment(cmd: SellEquipmentCommand): Promise<void>;
}
