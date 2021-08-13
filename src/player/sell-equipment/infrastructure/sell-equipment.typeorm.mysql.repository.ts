import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar-equipment.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { SellEquipmentRepository } from '../adapter/interface/sell-equipment.repository';
import { SellEquipmentCommand } from '../domain/command/sell-equipment.command';
import { AvatarEquipment } from '../domain/entity/avatar-equipment';
import { EquipmentSellStats } from '../domain/value-object/equipment-sell-stats';

export class SellEquipmentTypeOrmMySqlRepository
  implements SellEquipmentRepository
{
  constructor(
    @InjectRepository(AvatarEquipmentTypeOrmMySql)
    readonly avatarEquipmentRepository: Repository<AvatarEquipmentTypeOrmMySql>,
    @InjectRepository(PlayerTypeOrmMySql)
    readonly playerRepository: Repository<PlayerTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async sellEquipment(cmd: SellEquipmentCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.delete(AvatarEquipmentTypeOrmMySql, {
        id: cmd.removeAvatarEquipment.avatarEquipmentId,
      });
      await manager.increment(
        PlayerTypeOrmMySql,
        { id: cmd.givePlayerGold.playerId },
        'gold',
        cmd.givePlayerGold.amount,
      );
    });
  }

  async getAvatarEquipmentById(
    avatarEquipmentId: string,
  ): Promise<AvatarEquipment | null> {
    const ormAvatarEquipment = await this.avatarEquipmentRepository.findOne(
      avatarEquipmentId,
      {
        relations: [
          'avatar',
          'avatar.player',
          'avatar.player.user',
          'equipment',
        ],
      },
    );
    if (ormAvatarEquipment === undefined) return null;
    return new AvatarEquipment(
      ormAvatarEquipment.id,
      ormAvatarEquipment.avatar.player.id,
      ormAvatarEquipment.avatar.player.user.id,
      new EquipmentSellStats(ormAvatarEquipment.equipment.buyPrice),
    );
  }
}
