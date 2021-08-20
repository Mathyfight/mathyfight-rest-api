import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { Like, Repository } from 'typeorm';
import { SearchPlayerRepository } from '../adapter/interface/search-player.repository';
import { User } from '../domain/entity/user';

export class SearchPlayerTypeOrmMySqlRepository
  implements SearchPlayerRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
  ) {}

  async getUsersByUsernameLike(username: string): Promise<User[]> {
    const ormUsers = await this.userRepository.find({
      where: { username: Like(`%${username}%`) },
      relations: [
        'player',
        'player.avatar',
        'player.avatar.race',
        'player.avatar.equipments',
        'player.avatar.equipments.equipment',
      ],
    });

    return ormUsers
      .filter((u) => u.player !== null)
      .map((u) => {
        let helmetImageUrl = null;
        let chestplateImageUrl = null;
        let leggingsImageUrl = null;
        let bootsImageUrl = null;
        let shieldImageUrl = null;
        let weaponImageUrl = null;

        const equippedEquipments = u.player!.avatar.equipments.filter(
          (e) => e.equipped,
        );

        equippedEquipments.forEach((e) => {
          if (e.equipment.type === EquipmentType.Helmet)
            helmetImageUrl = e.equipment.imageUrl;

          if (e.equipment.type === EquipmentType.Boots)
            bootsImageUrl = e.equipment.imageUrl;

          if (e.equipment.type === EquipmentType.Chestplate)
            chestplateImageUrl = e.equipment.imageUrl;

          if (e.equipment.type === EquipmentType.Leggings)
            leggingsImageUrl = e.equipment.imageUrl;

          if (e.equipment.type === EquipmentType.Shield)
            shieldImageUrl = e.equipment.imageUrl;

          if (e.equipment.type === EquipmentType.Weapon)
            weaponImageUrl = e.equipment.imageUrl;
        });

        return new User(
          u.id,
          u.username,
          u.player!.avatar.race.imageUrl,
          u.player!.avatar.color,
          helmetImageUrl,
          chestplateImageUrl,
          leggingsImageUrl,
          bootsImageUrl,
          weaponImageUrl,
          shieldImageUrl,
        );
      });
  }
}
