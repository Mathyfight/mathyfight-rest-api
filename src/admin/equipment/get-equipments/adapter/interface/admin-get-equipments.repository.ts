import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { Equipment } from '../../domain/entity/equipment';
import { User } from '../../domain/entity/user';

export abstract class AdminGetEquipmentsRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getEquipments(equipmentType: EquipmentType): Promise<Equipment[]>;
}
