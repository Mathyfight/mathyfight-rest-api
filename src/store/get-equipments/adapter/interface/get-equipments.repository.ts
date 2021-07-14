import { GetEquipmentsCommand } from '../../domain/command/get-equipments.command';
import { Equipment } from '../../domain/entity/equipment';

export abstract class GetEquipmentsRepository {
  abstract getAvatarIdByUserId(userId: string): Promise<string | null>;
  abstract getEquipments(
    cmd: GetEquipmentsCommand,
  ): Promise<[Equipment[], number]>;
}
