import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar-equipment.typeorm.mysql';
import { EquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/equipment.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { Connection, Repository } from 'typeorm';
import { BuyEquipmentRepository } from '../adapter/interface/buy-equipment.repository';
import { BuyEquipmentCommand } from '../domain/command/buy-equipment.command';
import { Equipment } from '../domain/entity/equipment';
import { Player } from '../domain/entity/player';
import { User } from '../domain/entity/user';

export class BuyEquipmentTypeOrmMySqlRepository
  implements BuyEquipmentRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(EquipmentTypeOrmMySql)
    readonly equipmentRepository: Repository<EquipmentTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async buyEquipment(cmd: BuyEquipmentCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.decrement(
        PlayerTypeOrmMySql,
        { id: cmd.decreasePlayerGold.playerId },
        'gold',
        cmd.decreasePlayerGold.amount,
      );
      await manager.insert(AvatarEquipmentTypeOrmMySql, {
        id: cmd.addEquipmentToAvatar.avatarEquipmentId,
        equipped: cmd.addEquipmentToAvatar.equipped,
        avatar: { id: cmd.addEquipmentToAvatar.avatarId },
        equipment: { id: cmd.addEquipmentToAvatar.equipmentId },
      });
    });
  }

  async getUserById(userId: Uuid): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId.val, {
      relations: [
        'player',
        'player.avatar',
        'player.avatar.equipments',
        'player.avatar.equipments.equipment',
      ],
    });
    if (ormUser === undefined) return null;
    return new User(
      ormUser.player === null
        ? null
        : new Player(
            ormUser.player.id,
            ormUser.player.gold,
            ormUser.player.avatar.equipments.map(
              (ae) => new Equipment(ae.equipment.id, ae.equipment.buyPrice),
            ),
            ormUser.player.avatar.id,
          ),
    );
  }

  async getEquipmentById(equipmentId: Uuid): Promise<Equipment | null> {
    const ormEquipment = await this.equipmentRepository.findOne(
      equipmentId.val,
    );
    if (ormEquipment === undefined) return null;
    return new Equipment(ormEquipment.id, ormEquipment.buyPrice);
  }
}
