import { GetEquipmentsCommand } from '../../domain/command/get-equipments.command';
import { Equipment } from '../../domain/entity/equipment';
import { User } from '../../domain/entity/user';

export abstract class GetEquipmentsRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getEquipments(
    command: GetEquipmentsCommand,
  ): Promise<[Equipment[], number]>;
}
