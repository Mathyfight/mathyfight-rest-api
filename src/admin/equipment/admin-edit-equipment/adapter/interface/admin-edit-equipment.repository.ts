import { PersistEquipment } from '../../domain/command/persist-equipment';
import { Equipment } from '../../domain/entity/equipment';
import { User } from '../../domain/entity/user';

export abstract class AdminEditEquipmentRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getEquipmentById(equipmentId: string): Promise<Equipment | null>;
  abstract getImageUrlFromEquipment(
    equipmentId: string,
  ): Promise<string | null>;
  abstract persistEquipment(cmd: PersistEquipment): Promise<void>;
}
