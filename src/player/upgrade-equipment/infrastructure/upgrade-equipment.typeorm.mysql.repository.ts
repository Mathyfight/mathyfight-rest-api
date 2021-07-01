import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.equipment.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { Repository } from 'typeorm';
import { UpgradeEquipmentRepository } from '../application/adapter/upgrade-equipment.repository';
import { RemovePlayerGold } from '../domain/command/remove-player-gold';
import { UpgradeEquipmentLevel } from '../domain/command/upgrade-equipment-level';
import { AvatarEquipment } from '../domain/entity/avatar-equipment';
import { Player } from '../domain/entity/player';

export class UpgradeEquipmentTypeOrmMySqlRepository
  implements UpgradeEquipmentRepository
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
      { relations: ['avatar', 'avatar.player'] },
    );
    if (ormAvatarEquipment === undefined) return null;
    return new AvatarEquipment(
      ormAvatarEquipment.id,
      new Player(
        ormAvatarEquipment.avatar.player.id,
        ormAvatarEquipment.avatar.player.gold,
      ),
    );
  }

  async upgradeEquipmentLevel(command: UpgradeEquipmentLevel): Promise<void> {
    await this.avatarEquipmentRepository.increment(
      { id: command.avatarEquipmentId },
      'level',
      command.amount,
    );
  }

  async removePlayerGold(command: RemovePlayerGold): Promise<void> {
    await this.playerRepository.decrement(
      { id: command.playerId },
      'gold',
      command.amount,
    );
  }
}
