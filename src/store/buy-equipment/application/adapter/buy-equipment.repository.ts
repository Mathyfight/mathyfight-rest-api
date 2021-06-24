import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { AddEquipmentToAvatar } from '../../domain/command/add-equipment-to-avatar';
import { DecreasePlayerGold } from '../../domain/command/decrease-player-gold';
import { Equipment } from '../../domain/entity/equipment';
import { User } from '../../domain/entity/user';

export abstract class BuyEquipmentRepository {
  abstract getUserById(userId: Uuid): Promise<User | null>;
  abstract getEquipmentById(equipmentId: Uuid): Promise<Equipment | null>;
  abstract decreasePlayerGold(command: DecreasePlayerGold): Promise<void>;
  abstract addEquipmentToAvatarInventory(
    command: AddEquipmentToAvatar,
  ): Promise<void>;
}
