import { EquipEquipmentCommand } from '../../domain/command/equip-equipment.command';
import { AvatarEquipment } from '../../domain/entity/avatar-equipment';
import { User } from '../../domain/entity/user';

export abstract class EquipEquipmentRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getAvatarEquipmentById(
    avatarEquipmentId: string,
  ): Promise<AvatarEquipment | null>;
  abstract equipOrRemoveEquipment(cmd: EquipEquipmentCommand): Promise<void>;
}
