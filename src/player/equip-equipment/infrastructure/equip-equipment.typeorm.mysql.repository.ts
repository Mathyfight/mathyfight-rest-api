import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar-equipment.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { EquipEquipmentRepository } from '../adapter/interface/equip-equipment.repository';
import { EquipEquipmentCommand } from '../domain/command/equip-equipment.command';
import { AvatarEquipment } from '../domain/entity/avatar-equipment';
import { User } from '../domain/entity/user';

export class EquipEquipmentTypeOrmMySqlRepository
  implements EquipEquipmentRepository
{
  constructor(
    @InjectRepository(AvatarEquipmentTypeOrmMySql)
    private readonly avatarEquipmentRepository: Repository<AvatarEquipmentTypeOrmMySql>,
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId, {
      relations: ['player', 'player.avatar'],
    });
    if (ormUser === undefined) return null;
    return new User(
      ormUser.id,
      ormUser.player === null ? null : ormUser.player.avatar.id,
    );
  }

  async getAvatarEquipmentById(
    avatarEquipmentId: string,
  ): Promise<AvatarEquipment | null> {
    const ormAvatarEquipment = await this.avatarEquipmentRepository.findOne(
      avatarEquipmentId,
      { relations: ['avatar', 'equipment'] },
    );
    if (ormAvatarEquipment === undefined) return null;
    return new AvatarEquipment(
      ormAvatarEquipment.id,
      ormAvatarEquipment.avatar.id,
      ormAvatarEquipment.equipment.type,
    );
  }

  async equipOrRemoveEquipment(cmd: EquipEquipmentCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.query(
        `
        update avatar_equipment as ae
        inner join equipment as e ON ae.equipment_id = e.id 
        set ae.equipped = ?
        where 
          e.\`type\` = ? and 
          ae.equipped = ? and
          ae.avatar_id = ?
      `,
        [false, cmd.equipmentType, true, cmd.avatarId],
      );

      if (cmd.avatarEquipmentId !== undefined) {
        await manager.query(
          `
          update avatar_equipment as ae
          set ae.equipped = ?
          where ae.id = ?
        `,
          [true, cmd.avatarEquipmentId],
        );
      }
    });
  }
}
