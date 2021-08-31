import { PersistEquipment } from '../../domain/command/persist-equipment';
import { User } from '../../domain/entity/user';

export abstract class AdminEditEquipmentRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getImageUrlFromEquipment(
    equipmentId: string,
  ): Promise<string | null>;
  abstract persistEquipment(cmd: PersistEquipment): Promise<void>;
}
