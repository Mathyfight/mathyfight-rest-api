import { InjectRepository } from '@nestjs/typeorm';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { EquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/equipment.typeorm.mysql';
import { EquipmentSortingOrder } from 'src/store/get-equipments/domain/value-object/equipment-sorting-order';
import { Repository } from 'typeorm';
import { GetEquipmentsRepository } from '../adapter/interface/get-equipments.repository';
import { Equipment } from '../domain/entity/equipment';
import { GetEquipmentsCommand } from '../domain/command/get-equipments.command';
import { TypeOrmMySqlMapper } from 'src/shared/infrastructure/typeorm.mysql.mapper';

export class GetEquipmentTypeOrmMySqlRepository
  implements GetEquipmentsRepository
{
  constructor(
    @InjectRepository(EquipmentTypeOrmMySql)
    readonly equipmentRepository: Repository<EquipmentTypeOrmMySql>,
    @InjectRepository(AvatarTypeOrmMySql)
    readonly avatarRepository: Repository<AvatarTypeOrmMySql>,
  ) {}

  async getAvatarIdByUserId(userId: string): Promise<string | null> {
    const ormAvatar = await this.avatarRepository
      .createQueryBuilder('avatar')
      .innerJoinAndSelect('avatar.player', 'player')
      .innerJoinAndSelect('player.user', 'user')
      .where('user.id = :userId', { userId: userId })
      .getOne();
    if (ormAvatar === undefined) return null;
    return ormAvatar.id;
  }

  async getEquipments(
    cmd: GetEquipmentsCommand,
  ): Promise<[Equipment[], number]> {
    const order =
      cmd.equipmentSortingOrder === EquipmentSortingOrder.Attack
        ? 'attack'
        : cmd.equipmentSortingOrder === EquipmentSortingOrder.Defense
        ? 'defense'
        : cmd.equipmentSortingOrder === EquipmentSortingOrder.Name
        ? 'name'
        : 'buyPrice';

    const orderCriteria = TypeOrmMySqlMapper.sortingOrderCriteriaToSqlCriteria(
      cmd.sortingOrderCriteria,
    );

    const [ormEquipments, count] = await this.equipmentRepository
      .createQueryBuilder('equipment')
      .leftJoin(
        'equipment.avatars',
        'avatars',
        'avatars.avatar_id = :avatarId',
        { avatarId: cmd.avatarId },
      )
      .where('avatars.avatar_id is null')
      .andWhere('equipment.type = :equipmentType', {
        equipmentType: cmd.equipmentType,
      })
      .orderBy(`equipment.${order}`, orderCriteria)
      .skip((cmd.page - 1) * cmd.elementsPerPage)
      .take(cmd.elementsPerPage)
      .getManyAndCount();

    const equipments = ormEquipments.map(
      (e) =>
        new Equipment(
          e.id,
          e.name,
          e.attack,
          e.defense,
          e.imageUrl,
          e.description,
          e.buyPrice,
        ),
    );
    return [equipments, count];
  }
}
