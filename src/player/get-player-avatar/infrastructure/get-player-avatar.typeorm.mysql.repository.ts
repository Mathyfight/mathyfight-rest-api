import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { Repository } from 'typeorm';
import { GetPlayerAvatarRepository } from '../adapter/interface/get-player-avatar.repository';
import { Avatar } from '../domain/entity/avatar';
import { Equipment } from '../domain/entity/equipment';
import { User } from '../domain/entity/user';

export class GetPlayerAvatarTypeOrmMySqlRepository
  implements GetPlayerAvatarRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
  ) {}

  async getAvatarByUserId(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId, {
      relations: [
        'player',
        'player.avatar',
        'player.avatar.equipments',
        'player.avatar.equipments.equipment',
        'player.avatar.race',
      ],
    });
    if (ormUser === undefined) return null;

    if (ormUser.player === null) return new User(null);

    let helmet = null;
    let chestplate = null;
    let leggings = null;
    let boots = null;
    let shield = null;
    let weapon = null;

    const equippedEquipments = ormUser.player.avatar.equipments.filter(
      (e) => e.equipped,
    );

    equippedEquipments.forEach((e) => {
      if (e.equipment.type === EquipmentType.Helmet)
        helmet = new Equipment(
          e.id,
          e.equipment.attack,
          e.equipment.defense,
          e.equipment.imageUrl,
        );

      if (e.equipment.type === EquipmentType.Boots)
        boots = new Equipment(
          e.id,
          e.equipment.attack,
          e.equipment.defense,
          e.equipment.imageUrl,
        );

      if (e.equipment.type === EquipmentType.Chestplate)
        chestplate = new Equipment(
          e.id,
          e.equipment.attack,
          e.equipment.defense,
          e.equipment.imageUrl,
        );

      if (e.equipment.type === EquipmentType.Leggings)
        leggings = new Equipment(
          e.id,
          e.equipment.attack,
          e.equipment.defense,
          e.equipment.imageUrl,
        );

      if (e.equipment.type === EquipmentType.Shield)
        shield = new Equipment(
          e.id,
          e.equipment.attack,
          e.equipment.defense,
          e.equipment.imageUrl,
        );

      if (e.equipment.type === EquipmentType.Weapon)
        weapon = new Equipment(
          e.id,
          e.equipment.attack,
          e.equipment.defense,
          e.equipment.imageUrl,
        );
    });

    return new User(
      new Avatar(
        ormUser.player.avatar.race.id,
        ormUser.player.avatar.name,
        ormUser.player.avatar.maxHealth,
        ormUser.player.avatar.baseAttack,
        ormUser.player.avatar.baseDefense,
        ormUser.player.avatar.race.imageUrl,
        ormUser.player.avatar.color,
        helmet,
        chestplate,
        leggings,
        boots,
        shield,
        weapon,
        ormUser.player.avatar.currentExperience,
        ormUser.player.avatar.level,
      ),
    );
  }
}
