import { PersistEquipment } from '../../domain/command/persist-equipment';
import { User } from '../../domain/entity/user';

export abstract class AdminAddEquipmentRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract persistEquipment(cmd: PersistEquipment): Promise<void>;
}
