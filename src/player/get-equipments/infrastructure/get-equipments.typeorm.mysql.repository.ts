import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.equipment.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { EquipmentStats } from 'src/shared/domain/value-object/equipment/equipment-stats';
import { TypeOrmMySqlMapper } from 'src/shared/infrastructure/typeorm.mysql.mapper';
import { Repository } from 'typeorm';
import { GetEquipmentsRepository } from '../application/adapter/get-equipments.repository';
import { GetEquipmentsCommand } from '../domain/command/get-equipments.command';
import { Avatar } from '../domain/entity/avatar';
import { Equipment } from '../domain/entity/equipment';
import { User } from '../domain/entity/user';
import { GetEquipmentsTypeOrmMySqlMapper } from './typeorm.mysql.mapper';

export class GetEquipmentTypeOrmMySqlRepository
  implements GetEquipmentsRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(AvatarEquipmentTypeOrmMySql)
    readonly avatarEquipmentRepository: Repository<AvatarEquipmentTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId, {
      relations: ['player', 'player.avatar'],
    });
    if (ormUser === undefined) return null;
    return new User(
      ormUser.player === null ? null : new Avatar(ormUser.player.avatar.id),
    );
  }

  async getEquipments(
    command: GetEquipmentsCommand,
  ): Promise<[Equipment[], number]> {
    const sortingOrder =
      GetEquipmentsTypeOrmMySqlMapper.equipmentSortingOrderToColumn(
        command.equipmentSortingOrder,
      );
    const sortingCriteria =
      TypeOrmMySqlMapper.sortingOrderCriteriaToSqlCriteria(
        command.sortingOrderCriteria,
      );

    const ormAvatarEquipments: {
      avatarEquipmentId: string;
      level: number;
      name: string;
      description: string;
      imageUrl: string;
      baseAttack: number;
      baseDefense: number;
      baseSellPrice: number;
      levelAttackRate: string;
      levelDefenseRate: string;
      levelSellRate: string;
      upgradePrice: string;
      sellPrice: number;
    }[] = await this.avatarEquipmentRepository
      .createQueryBuilder('ae')
      .select('ae.id', 'avatarEquipmentId')
      .addSelect('ae.`level`', 'level')
      .addSelect('e.name', 'name')
      .addSelect('e.description', 'description')
      .addSelect('e.image_url', 'imageUrl')
      .addSelect('e.base_attack', 'baseAttack')
      .addSelect('e.base_defense', 'baseDefense')
      .addSelect('e.base_sell_price', 'baseSellPrice')
      .addSelect('e.level_attack_rate', 'levelAttackRate')
      .addSelect('e.level_defense_rate', 'levelDefenseRate')
      .addSelect('e.level_sell_rate', 'levelSellRate')
      .addSelect('10', 'upgradePrice')
      .addSelect(
        'ceil(e.base_sell_price * pow(1 + e.level_sell_rate, ae.`level` - 1))',
        'sellPrice',
      )
      .addSelect(
        'ceil(e.base_attack * pow(1 + e.level_attack_rate, ae.`level`-1))',
        'attack',
      )
      .addSelect(
        'ceil(e.base_defense * pow(1 + e.level_defense_rate, ae.`level`-1))',
        'defense',
      )
      .addSelect('cast(10 as float)', 'upgradePrice')
      .innerJoin('ae.equipment', 'e')
      .where('ae.avatar_id = :avatarId', { avatarId: command.avatarId })
      .andWhere('e.type = :equipmentType', {
        equipmentType: command.equipmentType,
      })
      .orderBy(`${sortingOrder}`, sortingCriteria)
      .offset((command.page - 1) * command.elementsPerPage)
      .limit(command.elementsPerPage)
      .getRawMany();

    const equipments = ormAvatarEquipments.map(
      (e) =>
        new Equipment(
          e.avatarEquipmentId,
          e.name,
          e.description,
          e.imageUrl,
          new EquipmentStats(
            e.baseAttack,
            e.baseDefense,
            e.baseSellPrice,
            e.level,
            parseFloat(e.levelAttackRate),
            parseFloat(e.levelDefenseRate),
            parseFloat(e.levelSellRate),
          ),
        ),
    );

    const totalRows = await this.avatarEquipmentRepository
      .createQueryBuilder('ae')
      .innerJoin('ae.equipment', 'e')
      .where('ae.avatar_id = :avatarId', { avatarId: command.avatarId })
      .andWhere('e.type = :equipmentType', {
        equipmentType: command.equipmentType,
      })
      .getCount();
    return [equipments, totalRows];
  }
}
