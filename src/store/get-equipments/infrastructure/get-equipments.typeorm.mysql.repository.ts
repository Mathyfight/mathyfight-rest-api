import { InjectRepository } from '@nestjs/typeorm';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { EquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/equipment.typeorm.mysql';
import { EquipmentSortingOrder } from 'src/store/get-equipments/domain/value-object/equipment-sorting-order';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { PositiveInteger } from 'src/shared/domain/value-object/primitive/number/positive-integer';
import { Repository } from 'typeorm';
import { GetEquipmentsRepository } from '../application/adapter/get-equipments.repository';
import { Equipment } from '../domain/entity/equipment';

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
    equipmentType: EquipmentType,
    elementsPerPage: number,
    page: PositiveInteger,
    avatarId: string,
    sortingOrderCriteria?: SortingOrderCriteria,
    equipmentSortingOrder?: EquipmentSortingOrder,
  ): Promise<[Equipment[], number]> {
    const order =
      equipmentSortingOrder === EquipmentSortingOrder.Attack
        ? 'baseAttack'
        : equipmentSortingOrder === EquipmentSortingOrder.Defense
        ? 'baseDefense'
        : equipmentSortingOrder === EquipmentSortingOrder.Name
        ? 'name'
        : 'buyPrice';

    const orderCriteria =
      sortingOrderCriteria === SortingOrderCriteria.Ascendant ? 'ASC' : 'DESC';

    const [ormEquipments, count] = await this.equipmentRepository
      .createQueryBuilder('equipment')
      .leftJoin(
        'equipment.avatars',
        'avatars',
        'avatars.avatar_id = :avatarId',
        { avatarId: avatarId },
      )
      .where('avatars.avatar_id is null')
      .andWhere('equipment.type = :equipmentType', { equipmentType })
      .orderBy(`equipment.${order}`, orderCriteria)
      .skip((page.val - 1) * elementsPerPage)
      .take(elementsPerPage)
      .getManyAndCount();

    const equipments = ormEquipments.map(
      (e) =>
        new Equipment(
          e.id,
          e.name,
          e.baseAttack,
          e.baseDefense,
          e.imageUrl,
          e.description,
          e.buyPrice,
        ),
    );
    return [equipments, count];
  }
}
