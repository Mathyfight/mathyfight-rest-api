import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { BuyEquipmentCommand } from '../../domain/command/buy-equipment.command';
import { Equipment } from '../../domain/entity/equipment';
import { User } from '../../domain/entity/user';

export abstract class BuyEquipmentRepository {
  abstract getUserById(userId: Uuid): Promise<User | null>;
  abstract getEquipmentById(equipmentId: Uuid): Promise<Equipment | null>;
  abstract buyEquipment(cmd: BuyEquipmentCommand): Promise<void>;
}
