import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.equipment.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { UpgradeEquipmentRepository } from '../adapter/interface/upgrade-equipment.repository';
import { UpgradeEquipmentCommand } from '../domain/command/upgrade-equipment.command';
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
    readonly connection: Connection,
  ) {}

  async upgradeEquipment(cmd: UpgradeEquipmentCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.increment(
        AvatarEquipmentTypeOrmMySql,
        { id: cmd.upgradeEquipmentLevel.avatarEquipmentId },
        'level',
        cmd.upgradeEquipmentLevel.amount,
      );
      await manager.decrement(
        PlayerTypeOrmMySql,
        { id: cmd.removePlayerGold.playerId },
        'gold',
        cmd.removePlayerGold.amount,
      );
    });
  }

  async getAvatarEquipmentById(
    avatarEquipmentId: string,
  ): Promise<AvatarEquipment | null> {
    const ormAvatarEquipment = await this.avatarEquipmentRepository.findOne(
      avatarEquipmentId,
      { relations: ['avatar', 'avatar.player', 'avatar.player.user'] },
    );
    if (ormAvatarEquipment === undefined) return null;
    return new AvatarEquipment(
      ormAvatarEquipment.id,
      ormAvatarEquipment.level,
      new Player(
        ormAvatarEquipment.avatar.player.id,
        ormAvatarEquipment.avatar.player.gold,
        ormAvatarEquipment.avatar.player.user.id,
      ),
    );
  }
}
