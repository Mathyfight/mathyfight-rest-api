import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.equipment.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { EquipmentSellStats } from 'src/shared/domain/value-object/equipment/equipment-sell-stats';
import { Repository } from 'typeorm';
import { SellEquipmentRepository } from '../application/adapter/sell-equipment.repository';
import { GivePlayerGold } from '../domain/command/give-player-gold';
import { RemoveAvatarEquipment } from '../domain/command/remove-avatar-equipment';
import { AvatarEquipment } from '../domain/entity/avatar-equipment';

export class SellEquipmentTypeOrmMySqlRepository
  implements SellEquipmentRepository
{
  constructor(
    @InjectRepository(AvatarEquipmentTypeOrmMySql)
    readonly avatarEquipmentRepository: Repository<AvatarEquipmentTypeOrmMySql>,
    @InjectRepository(PlayerTypeOrmMySql)
    readonly playerRepository: Repository<PlayerTypeOrmMySql>,
  ) {}

  async getAvatarEquipmentById(
    avatarEquipmentId: string,
  ): Promise<AvatarEquipment | null> {
    const ormAvatarEquipment = await this.avatarEquipmentRepository.findOne(
      avatarEquipmentId,
      { relations: ['avatar', 'avatar.player', 'equipment'] },
    );
    if (ormAvatarEquipment === undefined) return null;
    return new AvatarEquipment(
      ormAvatarEquipment.id,
      ormAvatarEquipment.avatar.player.id,
      new EquipmentSellStats(
        ormAvatarEquipment.equipment.baseSellPrice,
        ormAvatarEquipment.level,
        ormAvatarEquipment.equipment.levelSellRate,
      ),
    );
  }

  async removeAvatarEquipment(command: RemoveAvatarEquipment): Promise<void> {
    await this.avatarEquipmentRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', {
        id: command.avatarEquipmentId,
      })
      .execute();
  }

  async givePlayerGold(command: GivePlayerGold): Promise<void> {
    await this.playerRepository.increment(
      {
        id: command.playerId,
      },
      'gold',
      command.amount,
    );
  }
}
