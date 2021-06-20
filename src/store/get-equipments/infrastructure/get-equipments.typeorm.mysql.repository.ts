import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/equipment.typeorm.mysql';
import { EquipmentSortingOrder } from 'src/shared/domain/value-object/equipment/equipment-sorting-order';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
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
  ) {}

  async getEquipments(
    equipmentType: EquipmentType,
    page: PositiveInteger,
    avatarId: Uuid,
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
        { avatarId: 'ef7c46b9-d7ed-4f6d-99a2-ccedd2ebaa7e' },
      )
      .where('avatars.avatar_id is null')
      .andWhere('equipment.type = :equipmentType', { equipmentType })
      .orderBy(`equipment.${order}`, orderCriteria)
      .skip((page.val - 1) * 10)
      .take(10)
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
